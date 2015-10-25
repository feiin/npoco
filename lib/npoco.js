
var config = require("./dbs/config.js");

var _ = require("lodash");
var fs = require('fs');
var path = require("path");
var npoco = {

    renderCode:function(options){

        var self  = this;
        var dbConfig = _.assign(config,options);

        console.log(dbConfig.database.protocol);
        var dbGenerator = require("./dbs/"+dbConfig.database.protocol+".js");


        var schemaReader = new dbGenerator();
        schemaReader.readSchema(dbConfig,function(err,tables){

            if(err){
                console.log("readSchema err:",err.toString());
                return;

            }

            tables = self.getRenderTables(tables,dbConfig);

            var RenderEngine = require("./renders/default.js");

            var renderEngine = new RenderEngine(dbConfig,tables);

         //   console.log();
            var str = renderEngine.render();
            var resultPath = path.join(__dirname,"result.cs");
           // fs.writeFileSync(resultPath,str,"utf8");
            //console.log(str);
           // console.log("readSchema...",JSON.stringify(tables[0]));
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

    },
    render:function(tables,dbConfig){


    },
    renderCommon:function(tables){

    },
    renderPocos:function(tables){

    },
    renderOperations:function(tables){

    }

};

module.exports = npoco;