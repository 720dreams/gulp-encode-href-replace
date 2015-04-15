/* global it describe */

'use strict';

var assert = require('assert');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var path = require('path');
var rev = require('gulp-rev');
var es = require('event-stream');

var revReplace = require('./index');

var htmlFileBody = '<html><head><link href="http://test.css" rel="stylesheet" type="text/css"></head><body><h1>Test</h1><a target="_blank" role="encoded" id="One" href="views.html?arg1=my text&img=images/logo.png&number=1234" class="test">Link1</a><a href="views.html?unencoded=unencoded">Link3</a><h2>Text</h2><a role="encoded" href="http://domain.com/views.html?arg1=my text2&img=images/logo2.png&number=12345">Link2</a></body></html>';
var encoded1 = 'encoded=YXJnMT1teSB0ZXh0MiZpbWc9aW1hZ2VzL2xvZ28yLnBuZyZudW1iZXI9MTIzNDU=';
var encoded2 = 'encoded=YXJnMT1teSB0ZXh0JmltZz1pbWFnZXMvbG9nby5wbmcmbnVtYmVyPTEyMzQ=';
var unencoded = 'unencoded=unencoded';

var htmlFileBodyEmpty = '<html><head><link href="http://test.css" rel="stylesheet" type="text/css"></head><body><h1>Test</h1></body></html>';

it('should replace hrefs in .html files', function (cb) {
    var filesToRevFilter = filter([]);

    var stream = filesToRevFilter
        .pipe(rev())
        .pipe(filesToRevFilter.restore())
        .pipe(revReplace());

    var fileCount = 0;

    stream.on('data', function (file) {
        var contents = file.contents.toString();
        var extension = path.extname(file.path);

        if (extension === '.html') {
            assert(contents.indexOf(encoded1) >= 0, 'The encoded param not found: ' + encoded1);
            assert(contents.indexOf(encoded2) >= 0, 'The encoded param not found: ' + encoded2);
            assert(contents.indexOf(unencoded) >= 0, 'The unencoded params not found: ' + unencoded);
            fileCount++;
        }

    });
    stream.on('end', function () {
        assert.equal(fileCount, 1, 'Only 1 file should pass through the stream');
        cb();
    });

    filesToRevFilter.write(new gutil.File({
        path: 'index.html',
        contents: new Buffer(htmlFileBody)
    }));

    filesToRevFilter.end();
});

it('should not change anything .html files', function (cb) {
    var filesToRevFilter = filter([]);

    var stream = filesToRevFilter
        .pipe(rev())
        .pipe(filesToRevFilter.restore())
        .pipe(revReplace());

    var fileCount = 0;

    stream.on('data', function (file) {
        var contents = file.contents.toString();
        var extension = path.extname(file.path);

        if (extension === '.html') {
            assert(contents === htmlFileBodyEmpty, 'HTML changed');
            fileCount++;
        }

    });
    stream.on('end', function () {
        assert.equal(fileCount, 1, 'Only 1 file should pass through the stream');
        cb();
    });

    filesToRevFilter.write(new gutil.File({
        path: 'index.html',
        contents: new Buffer(htmlFileBodyEmpty)
    }));

    filesToRevFilter.end();
});

