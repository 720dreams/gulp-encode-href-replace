'use strict';

module.exports = plugin;

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var base64 = require('./base64');

function plugin(options) {
    var cache = [],
        hrefRe = /href\s*=\s*"([^\'\"]+)/g,
        linkRe = /[^<]*(<a href\s*=\s*"([^"]+)">([^<]+)<\/a>)/g,
        replaceRe = /href\s*=\s*".*\?/g,
        contents,
        dataClear,
        dataEncoded,
        stream;

    options = options || {};

    options.queryParameter = options.queryParameter || 'encoded=';
    options.replaceInExtensions = options.replaceInExtensions || ['.html', '.hbs'];

    return through.obj(function collectRevs(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-base64-href-replace', 'Streaming not supported'));
            return cb();
        }

        if (options.replaceInExtensions.indexOf(path.extname(file.path)) > -1) {
            // file should be searched for replaces
            cache.push(file);
        } else {
            // nothing to do with this file
            this.push(file);
        }
        cb();
    }, function replaceInFiles(cb) {

        stream = this;
        cache.forEach(function replaceInFile(file) {

            contents = file.contents.toString();
            contents.match(linkRe).forEach(function (link) {
                link.match(hrefRe).forEach(function (href) {

                    dataClear = href.replace(replaceRe, '');
                    dataEncoded = options.queryParameter + base64.Base64.encode(dataClear);
                    contents = contents.replace(dataClear, dataEncoded);
                });
            });

            file.contents = new Buffer(contents);
            stream.push(file);
        });

        cb();

    });

}
