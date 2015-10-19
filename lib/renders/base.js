var _ = require("lodash");
var fs = require('fs');
var ejs = require("ejs");
var path = require("path");

var baseRender = function(){

};

baseRender.prototype.render = function(){

};

baseRender.prototype.renderView = function(name,data){


    var viewPath = path.join(__dirname,"../templates",name);
    var viewContent = fs.readFileSync(viewPath,'utf8')
    var template = ejs.compile(viewContent,{filename:viewPath});
    return template(data);
};

baseRender.prototype.saveFile = function(path,content,callback){

};

module.exports = baseRender;

