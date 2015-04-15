/* global it describe */

'use strict';

var assert = require('assert');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var path = require('path');
var rev = require('gulp-rev');
var es = require('event-stream');

var revReplace = require('./index');

var htmlFileBody = '<html><head><link href="http://test.css" rel="stylesheet" type="text/css"></head><body><h1>Test</h1><a href="views.html?arg1=my text&img=images/logo.png&number=1234">Link1</a><h2>Text</h2><a href = "http://domain.com/views.html?arg1=my text2&img=images/logo2.png&number=12345">Link2</a></body></html>';
var encoded1 = 'encoded=YXJnMT1teSB0ZXh0MiZpbWc9aW1hZ2VzL2xvZ28yLnBuZyZudW1iZXI9MTIzNDU=';
var encoded2 = 'encoded=YXJnMT1teSB0ZXh0JmltZz1pbWFnZXMvbG9nby5wbmcmbnVtYmVyPTEyMzQ=';

it('should by default replace filenames in .css and .html files', function (cb) {
    var filesToRevFilter = filter(['**/*.css', '**/*.svg', '**/*.png']);

    var stream = filesToRevFilter
        .pipe(rev())
        .pipe(filesToRevFilter.restore())
        .pipe(revReplace());

    var fileCount = 0;
    var unreplacedCSSFilePattern = /style\.css/;
    var unreplacedSVGFilePattern = /font\.svg/;
    var unreplacedPNGFilePattern = /image\.png/;

    stream.on('data', function (file) {
        var contents = file.contents.toString();
        var extension = path.extname(file.path);
        
        if (extension === '.html') {
            assert(contents.indexOf(encoded1), 'The encoded param not found: ' + encoded1);
            assert(contents.indexOf(encoded1), 'The encoded param not found: ' + encoded2);
        }
        fileCount++;
    });
    stream.on('end', function () {
        assert.equal(fileCount, 1, 'Only four files should pass through the stream');
        cb();
    });

    filesToRevFilter.write(new gutil.File({
        path: 'index.html',
        contents: new Buffer(htmlFileBody)
    }));

    filesToRevFilter.end();
});
