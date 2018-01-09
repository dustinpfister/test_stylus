let stylus = require('stylus'),
fs = require('fs-extra'),
path = require('path'),

source = 'styl',
target = 'css';

let writeCSS = function (css, fn) {

    let uri = path.join(target, fn);

    return fs.writeFile(uri, css, 'utf-8');

};

let processFile = function (file) {

    let uri = path.join(source, file);

    return fs.readFile(uri, 'utf-8').then(function (data) {

        let css = stylus.render(data);
        let fn = file.replace(/.styl$/, '.css');

        return writeCSS(css, fn);

    }).then(function () {

        console.log('sucess');

    }).catch (function (e) {

        console.log(e);

    });

};

// ensure the styl folder is there
fs.ensureDir(source).then(function () {

    // ensure the css folder is there
    return fs.ensureDir(target);

}).then(function () {

    // read the source path
    return fs.readdir(source);

}).then(function (files) {

    // call for each
    files.forEach(processFile);

}).catch (function (e) {

    console.log(e);

});

