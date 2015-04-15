#[gulp](https://github.com/wearefractal/gulp)-base64-href-replace

Substituts GET parameters in href with base64 encoded string

## Install

```bash
$ npm install --save-dev git+https://github.com/720dreams/gulp-base64-href-replace.git
# or for local
$ npm link
```

## Usage

```html
<a role="encoded" href="views.html?arg1=my text&img=images/logo.png&number=1234">Link</a>
```

```js
var gulp = require('gulp');
var base64Replace = require('gulp-base64-href-replace');

gulp.task('base64Replace', [], function () {
    return gulp.src('dist/*.html')
        .pipe(base64Replace())
        .pipe(gulp.dest('dist'));
})
```

## License

[MIT](http://opensource.org/licenses/MIT) © [720dreams LLC](http://720dreams.com)
