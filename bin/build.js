'use strict'

require('dotenv').config();

var Mustache = require('mustache');
var FILE_ENCODING = 'utf-8',
    _fs = require('fs');

var isProduction = false;
if (process.env.host_db == 'localhost') {
    isProduction = true;
}

var rendered = Mustache.render(_fs.readFileSync('./bin/index.html', FILE_ENCODING), { isProduction: isProduction });

_fs.writeFileSync('./public/index.html', rendered);

console.log('index.html generated!!!');