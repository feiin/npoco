#! /usr/bin/env node

var npoco = require("./lib/npoco.js");
var cli = require('commander');
var pjson = require("./package.json");
var inquirer = require("inquirer");
var questions = require("./questions");
var defaultConfig = require("./lib/dbs/config.js");
var fs = require('fs');


cli.version(pjson.version)
    .description(pjson.description)


cli.command('init')
    .option("-p, --path <path> ","set path to save npcoco.json file")
    .description(" init a npoco.json file for npoco")
    .action(function(options){

        console.log("init options..",options.path)

        inquirer.prompt(questions, function( answers ) {
            var config = answers;
            config.database = defaultConfig.database;
            config.database.host = answers["database.host"];
            config.database.password = answers["database.password"];
            config.outPath = process.cwd();
            delete answers["database.host"];
            delete answers["database.password"]

            var savepath = process.cwd();
            if(options&&options.path){
                savepath = options.path;
            }
            npoco.init(config,savepath);
            console.log("npoco.json init  and save to "+savepath+"  success!");
            console.log("run ` npoco gen ` continue to generate classes ")

        });

    }).on("--help",function(){

        console.log('  Examples:');
        console.log();
        console.log('    $ npoco init');
        console.log('    $ npoco init -p /your/path/to/save/npoco.json.');
        console.log();
        console.log(" defaults save to ./npoco.json with no options supplied")
    });


cli.command('gen')
    .option("-p,--path <path>","set path to save generate POCO classes files")
    .option("-c,--config <config>","get config path. defaults to ./npoco.json")
    .option("-f,--filename <filename>","classes save filename,defaults to Database.cs")
    .description(" generate POCO classes")
    .action(function(options){

        var configPath = process.cwd()+"/npoco.json";
        if(options&&options.config){
            configPath = options.config;
        }

        fs.readFile(configPath, 'utf8', function (err, data) {
            if (err)
            {
                console.log("read "+configPath+" error!",err);
                console.log('run `npoco -h` for help')
                return;
            }
            var obj = JSON.parse(data);

            if(options&&options.filename){
                obj.generateFileName = options.filename;
            };

            if(options&&options.path){
                obj.outPath = options.path;
            };

            npoco.renderCode(obj);
        });



    })
    .on("--help",function(){

        console.log('  Examples:');
        console.log();
        console.log('    $ npoco gen');
        console.log('    $ npoco gen -c /your/npoco/config/path');
        console.log('    $ npoco gen -p /your/path/to/save/poco/class');
        console.log('    $ npoco gen -c /your/npoco/config/path/npoco.json -p /your/path/to/save/poco/class');
        console.log();
    });


cli.parse(process.argv);

if (cli.args.length==0) {

    cli.help();
}
