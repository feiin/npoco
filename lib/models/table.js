
var _ = require("lodash");

var Table = function(){

    this.columns = [];
    this.name="";
    this.schema="";
    this.className = "";
    this.ignore = false;

};


Table.prototype.GetColumn = function(columnName) {
    if(!this.columns){
        return null;
    }
   return _.find(this.columns,function(col){
        col.name == columnName;
    });
};



module.exports = Table;