'use strict'

var FILE_ENCODING = 'utf-8',
    EOL = '\n',
    _fs = require('fs'),
    uglyfyJS = require('uglify-js');

var sources = [
    'public/app.js',
    'public/config.js',
    'public/componentes/componentes.js',
    'public/componentes/menu/menu.js',
    'public/estados/estados.js',
    'public/estados/login/loginState.js',
    'public/estados/dashboard/dashboardState.js',
    'public/servicios/servicios.js',
    'public/servicios/login/loginService.js',
    'public/servicios/invoices/invoicesService.js'
],
    concatOut = 'appfiles.js',
    minifiedOut = 'public/dist/appfiles.min.js';
    

if (_fs.existsSync(concatOut)) {
    _fs.unlinkSync(concatOut);
}

function concat(fileList, distPath) {
    var out = fileList.map(function (filePath) {
        return _fs.readFileSync(filePath, FILE_ENCODING);
    });

    _fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
    console.log(' ' + distPath + ' built.');
}
concat(sources, concatOut);

function uglify(srcPath, distPath) {
    var jsp = uglyfyJS.parser,
        pro = uglyfyJS.uglify,
        ast = jsp.parse(_fs.readFileSync(srcPath, FILE_ENCODING));

    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);

    _fs.writeFileSync(distPath, pro.gen_code(ast), FILE_ENCODING);
    console.log(' ' + distPath + ' built.');
}

uglify(concatOut, minifiedOut);

_fs.unlinkSync(concatOut);

console.log("and you're done");