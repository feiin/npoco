var util = require("util");
var SchemaReader = require("./SchemaReader.js");
var models = require("../models");

var _ = require("lodash");
var orm = require("orm");
var inflection = require( 'inflection' );
var async = require("async");



var Mysql = function(){
    Mysql.super_.call(this);
    this.tableSql ="SELECT * FROM tables WHERE (table_type='BASE TABLE' OR table_type='VIEW') AND table_schema = ?";
   this.columnSql ="SELECT * FROM COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?";
};

util.inherits(Mysql, SchemaReader);

var db =null;

Mysql.prototype.connect = function(dbConfig,cb){

    db=orm.connect(dbConfig.database);
    db.on("connect",function(err){
        if(err){
            console.log("connection database error,please check your password");
            return cb(new Error('connection database error'))
        }
        console.log("connection database success");
        cb(null,db)
    });

};

Mysql.prototype.close = function(cb){
    if(db){
        return db.close(cb);
    }
    if(cb){
        cb(null);
    }

};

Mysql.prototype.readSchema = function(dbConfig,cb){

    var that = this;

    var tables = [];
    that.connect(dbConfig,function(err,db){

        if(err){
            return cb(err);
        }
        async.auto({
            readTables:function(callback){


                db.driver.execQuery(that.tableSql,[dbConfig.schemaName],function(err,items){

                    if(err){
                        return callback(err);
                    }

                    items.forEach(function(item){

                        var table = new models.Table();

                        table.name=item["TABLE_NAME"];
                        table.schema=item["TABLE_SCHEMA"];
                        table.isView= (item["TABLE_TYPE"]=="View");
                        table.cleanName=that.cleanUp(table.name);
                        table.className=inflection.singularize(table.cleanName);
                        tables.push(table);
                    });

                    callback(null,tables);
                });

            },
            readColumns:["readTables",function(callback,results){

                var tasks = [];

                var items = results.readTables;
                items.forEach(function(table){

                    var task = (function(table){

                        return function(callback){


                            db.driver.execQuery(that.columnSql,[table.name,dbConfig.schemaName],function(err,items){

                                if(err){
                                    return callback(err);
                                }
                                items.forEach(function(item){

                                    var column = new models.Column();

                                    column.name = item["COLUMN_NAME"];
                                    column.propertyName = that.cleanUp(column.name);

                                    column.propertyType=that.getPropertyType(item);
                                    column.isNullable=(item["IS_NULLABLE"]=="YES");
                                    column.isPK=(item["COLUMN_KEY"]=="PRI");
                                    column.isAutoIncrement= false;

                                    if(item["EXTRA"]&&item["EXTRA"].toString().toLowerCase().indexOf("auto_increment")>=0) {
                                        column.isAutoIncrement = true;
                                    }
                                    if(table.pk==null&&column.isPK)
                                    {
                                        table.pk = column;
                                    }
                                    table.columns.push(column);
                                });


                                callback(null,items);
                            });
                        };
                    })(table);

                    tasks.push(task);

                });

                async.parallel(tasks,function(err,results){
                    callback(err,results);
                });



            }]
        },function(err,results){

            if(err){
                return cb(err);
            }

            return cb(null,tables);

        });
    });

};


Mysql.prototype.getPropertyType = function(row){

    var bUnsigned = row["COLUMN_TYPE"].toString().indexOf("unsigned")>=0;
    var propType="string";

    switch (row["DATA_TYPE"].toString())
    {
        case "bigint":
            propType= bUnsigned ? "ulong" : "long";
            break;
        case "int":
            propType= bUnsigned ? "uint" : "int";
            break;
        case "smallint":
            propType= bUnsigned ? "ushort" : "short";
            break;
        case "guid":
            propType=  "Guid";
            break;
        case "smalldatetime":
        case "date":
        case "datetime":
        case "timestamp":
            propType=  "DateTime";
            break;
        case "float":
            propType="float";
            break;
        case "double":
            propType="double";
            break;
        case "numeric":
        case "smallmoney":
        case "decimal":
        case "money":
            propType=  "decimal";
            break;
        case "bit":
        case "bool":
        case "boolean":
        case "tinyint":
            propType=  "bool";
            break;
        case "image":
        case "binary":
        case "blob":
        case "mediumblob":
        case "longblob":
        case "varbinary":
            propType=  "byte[]";
            break;

    }
    return propType;

};


module.exports = Mysql;
