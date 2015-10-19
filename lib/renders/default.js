
var util = require("util");
var baseRender = require("./base.js");

var DefaultRender = function(dbConfig,tables){
    this.dbConfig = dbConfig;
    this.tables = tables;
    DefaultRender.super_.call(this,dbConfig,tables);
};
util.inherits(DefaultRender, baseRender);

DefaultRender.prototype.render = function(){

    var self = this;
   return self.renderView('default/database.ejs',{dbConfig:this.dbConfig,tables:this.tables});
};

DefaultRender.prototype.renderCommon = function(){

};

DefaultRender.prototype.renderPocos = function(){

};

DefaultRender.prototype.renderOperations = function(){

};

module.exports = DefaultRender;