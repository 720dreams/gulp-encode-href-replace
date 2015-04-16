#[gulp](https://github.com/wearefractal/gulp)-encode-href-replace

Substituts GET parameters in href with encode encoded string

## Install

```bash
$ npm install --save-dev git+https://github.com/720dreams/gulp-encode-href-replace.git
# or for local
$ npm link
```

## Usage

```html
<a role="encoded" href="views.html?arg1=my text&img=images/logo.png&number=1234">Link</a>
<a href="views.html?number=1234">Link</a>
```

```js
var gulp = require('gulp');
var encodeReplace = require('gulp-encode-href-replace');

gulp.task('encodeReplace', [], function () {
    return gulp.src('dist/*.html')
        .pipe(encodeReplace())
        .pipe(gulp.dest('dist'));
})
```

### Result

```html
<a role="encoded" href="views.html?encoded=YXJnMT1teSB0ZXh0JmltZz1pbWFnZXMvbG9nby5wbmcmbnVtYmVyPTEyMzQ=">Link</a>
<a href="views.html?number=1234">Link</a>
```

## License

[MIT](http://opensource.org/licenses/MIT) © [720dreams LLC](http://720dreams.com)
