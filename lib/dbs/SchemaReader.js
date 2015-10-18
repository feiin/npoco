
var _ = require("lodash");

var SchemaReader = function(){

};

SchemaReader.prototype.readSchema = function(options,cb){

};

SchemaReader.prototype.getPropertyType = function(sqlType){

};

SchemaReader.prototype.cleanUp = function(name) {
    if(!name){
        return "";
    }

    var result = name.replace(/[^\w\d_]/,"_");
    var firstChar = parseInt(result[0]);

    if(firstChar>=0){
        result = "_"+result;
    }
    return result;
};

module.exports = SchemaReader;