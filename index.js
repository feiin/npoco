#! /usr/bin/env node

var npoco = require("./lib/npoco.js");
var cli = require('commander');

var pjson = require("./package.json");



cli.version(pjson.version)
    .description(pjson.description)


cli.command('init')
    .option("-p, --path <path> ","set path to save npcoco.json file")
    .description(" init a npoco.json file for npoco")
    .action(function(options){

        console.log("init options..",options.path)

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
    .option("-c,--config <config>","set config path. defaults to ./npoco.json")
    .description(" generate POCO classes")
    .action(function(options){
        console.log("generate code..",options.path,options.config)

    })
    .on("--help",function(){

        console.log('  Examples:');
        console.log();
        console.log('    $ npoco gen');
        console.log('    $ npoco gen -c /your/npoco/config/path');
        console.log('    $ npoco gen -p /your/path/to/save/poco/class');
        console.log('    $ npoco gen -c /your/npoco/config/path -p /your/path/to/save/poco/class');
        console.log();
    });


cli.parse(process.argv);

npoco.renderCode({"schemaName":"dollor"});
