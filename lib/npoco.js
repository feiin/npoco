
var config = require("./dbs/config.js");

var _ = require("lodash");
var fs = require('fs');
var path = require("path");
var npoco = {

    init:function(options,savePath){

        var self =  this;
        var dbConfig = _.assign(config,options);
        var resultPath = path.join(savePath,"npoco.json");
        fs.writeFileSync(resultPath,JSON.stringify(dbConfig, null, "  "),"utf8");

    },
    renderCode:function(options){

        var self  = this;
        var dbConfig = _.assign(config,options);

        var dbGenerator = require("./dbs/"+dbConfig.database.protocol+".js");


        var schemaReader = new dbGenerator();
        schemaReader.readSchema(dbConfig,function(err,tables){

            if(err){
                console.log("readSchema err:",err.toString());
                return;

            }

            tables = self.getRenderTables(tables,dbConfig);

            schemaReader.close();

            if(tables==null||tables.length==0){
                console.error("tables not exits!");
                return;
            }
            var RenderEngine = require("./renders/default.js");

            var renderEngine = new RenderEngine(dbConfig,tables);

            var str = renderEngine.render();
            var resultPath = path.join(dbConfig.outPath,dbConfig.generateFileName);

            if(dbConfig.generate3TierArchitecture){
                resultPath = path.join(dbConfig.outPath,"NPoco.Model");
                var existsDir = fs.existsSync(resultPath);
                if(!existsDir){
                    fs.mkdirSync(resultPath);
                }
                resultPath = path.join(resultPath,dbConfig.generateFileName);
            }
            fs.writeFileSync(resultPath,str,"utf8");

            if(dbConfig.generate3TierArchitecture) {
                tables.forEach(function (m) {


                    var dalClass = renderEngine.renderDal('default/dal.ejs', {dbConfig: dbConfig, table: m});
                    var outDir = path.join(dbConfig.outPath, "NPoco.DAL");
                    var existsDir = fs.existsSync(outDir);
                    if (!existsDir) {
                        fs.mkdirSync(outDir);
                    }
                    var dalPath = path.join(outDir, m.className + ".cs");

                    fs.writeFileSync(dalPath, dalClass, "utf8");
                });

                tables.forEach(function (m) {


                    var dalClass = renderEngine.renderDal('default/bll.ejs', {dbConfig: dbConfig, table: m});
                    var outDir = path.join(dbConfig.outPath, "NPoco.BLL");
                    var existsDir = fs.existsSync(outDir);
                    if (!existsDir) {
                        fs.mkdirSync(outDir);
                    }
                    var dalPath = path.join(outDir, m.className + ".cs");

                    fs.writeFileSync(dalPath, dalClass, "utf8");
                });
            }
            console.log("Generator code success!")

        });



    },
    getRenderTables:function(tables,dbConfig){

        //Remove unrequired tables/views
        _.remove(tables,function(table){

            return !dbConfig.includeViews&&table.isView;
        });



        var rxClean = /^(Equals|GetHashCode|GetType|ToString|repo|Save|IsNew|Insert|Update|Delete|Exists|SingleOrDefault|Single|First|FirstOrDefault|Fetch|Page|Query)$"/;
        tables.forEach(function(table) {

            var name = table.className;
            var sb = [];
            var upperFlag = true;

            if (dbConfig.tablePrefix && name.indexOf(dbConfig.tablePrefix) == 0) {
                name = name.substr(dbConfig.tablePrefix.length);
            }
            
            for(var i=0;i<name.length;i++){
                if(name[i]=="_"){
                    upperFlag = true;
                    continue;
                }

                if (upperFlag)
                {
                    sb.push(name[i].toString().toUpperCase());
                    upperFlag = false;
                }
                else
                {
                    sb.push(name[i]);
                }
            }

            table.className = config.classPrefix + sb.join("") + config.classSuffix;

            table.columns.forEach(function(col){

                col.propertyName = col.propertyName.replace(rxClean, "_$1");

                if (col.propertyName == table.className)
                {
                    col.propertyName = "_" + col.propertyName;
                }

            });

        });


        return tables;

    }

};

module.exports = npoco;