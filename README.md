#[gulp](https://github.com/wearefractal/gulp)-base64-href-replace

Substituts GET parameters in href with base64 encoded string

## Install

```bash
$ npm install --save-dev gulp-base64-href-replace
```

## Usage

```js
var gulp = require('gulp');
var base64Replace = require('gulp-base64-href-replace');

gulp.task("index", function() {

  return gulp.src("src/index.html")
    .pipe(base64Replace())
});
```

## Contributors

- Marcel Eyer

## License

[MIT](http://opensource.org/licenses/MIT) © [720dreams LLC](http://720dreams.com)
