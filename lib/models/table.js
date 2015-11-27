
var _ = require("lodash");

var Table = function(){

    this.columns = [];
    this.name="";
    this.schema="";
    this.className = "";
    this.ignore = false;
    this.pk = null;
    this.sequenceName=null;
    this.pks = [];

};


Table.prototype.GetColumn = function(columnName) {
    if(!this.columns){
        return null;
    }
   return _.find(this.columns,function(col){
        col.name == columnName;
    });
};


String.prototype.toFirstLower = function(){
    return this && this[0].toLowerCase() + this.slice(1);
};


module.exports = Table;