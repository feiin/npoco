#! /usr/bin/env node

var npoco = require("./lib/npoco.js");

console.log('hello this is npoco');
console.log(process.argv);

npoco.renderCode({"schemaName":"dollor"});
