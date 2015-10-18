var Column = function() {
    this.name = "";
    this.propertyName="";
    this.propertyType="";
    this.isPK=false;
    this.isNullable = false;
    this.isAutoIncrement = false;
    this.ignore = false;
};

module.exports = Column;