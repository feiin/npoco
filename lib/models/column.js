var Column = function() {
    this.name = "";
    this.propertyName="";
    this.propertyType="";
    this.isPK=false;
    this.isNullable = false;
    this.isAutoIncrement = false;
    this.ignore = false;
    this.comment = "";
};


Column.prototype.checkNullable = function(col){
    var result="";
    if(col.isNullable && col.propertyType !="byte[]" && col.propertyType !="string" && col.propertyType !="Microsoft.SqlServer.Types.SqlGeography" && col.propertyType !="Microsoft.SqlServer.Types.SqlGeometry"
    ){
        result="?";
    }

    return result;
};

module.exports = Column;