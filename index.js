#! /usr/bin/env node

var npoco = require("./lib/npoco.js");

console.log('hello this is npoco');
console.log(process.argv);
console.log(process.cwd());
console.log(__dirname);
npoco.renderCode({"schemaName":"dollor"});
