var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    rename = require('gulp-rename');


var outputPath = 'output';
var sourcePath = 'src';
var styleSourcePath = sourcePath + '/app/src/app/styles';
var scssWild = styleSourcePath + '/**/*.scss';
var scssRoot = styleSourcePath + '/main.scss';
var allScss = styleSourcePath + '/all.scss';
var bowerMix = styleSourcePath + '/bower.scss';
var bower = sourcePath + '/app/src/bower_components/';
var overviewPath = styleSourcePath + '/README.md';

// gulp.task('bower_deps', function() {
//   return gulp.src(mainBowerFiles({ paths: 'src/app', filter: /\.js/}))
//     // .pipe(uglify({outSourceMap: true}))
//     .pipe(plumber())
//     .pipe(concat('bower_deps.js'))
//     .pipe(gulp.dest(outputPath + '/app'));
// });

// gulp.task('bower', function() {
//   return bower({ cwd: '/Users/AWardwell/Sites/amazon_style/src/app' });
// });


gulp.task('static', function() {
  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest(outputPath + '/fonts'));
});

// gulp.task('template_files', function() {
//   return gulp.src(['src/app/src/app/directives/**/tpls/*.html'])
//     .pipe(rename({dirname:''}))
//     .pipe(gulp.dest(outputPath + '/tpls'));
// });

// gulp.task('styleguide:generate', ['css'], function() {
gulp.task('styleguide:generate', function() {
    return gulp.src(scssWild)
    .pipe(styleguide.generate({
        title: 'AUX',
        server: true,
        rootPath: outputPath,
        overviewPath: overviewPath,
        // filesConfig: [
        // {
        //   "name": "app",
        //   "files": [
        //     "app/src/app/index.module.js",
        //     "app/src/app/directives/form/formEl.directive.js",
        //     "app/bower_components/angular-ui-select/dist/select.min.css"
        //   ],
        //   template: "tpls/formEl.html",
        // }
        // ],
        // disableEncapsulation: true,
        // additionalNgDependencies: ['ui.bootstrap', 'ui.select'],
        // afterBody: 
        //     "<script type='text/javascript' src='app/bower_components/angular-bootstrap/ui-bootstrap.min.js'></script>"+
        //     "<script type='text/javascript' src='app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'></script>"+
        //     "<script type='text/javascript' src='app/bower_components/angular-ui-select/dist/select.min.js'></script>"

      }))
    .pipe(gulp.dest(outputPath));
});

// gulp.task('css', function() {
//   return gulp.src(bower + 'angular-ui-select/dist/select.min.css')
//     .pipe(rename({extname: ".scss"}))
//     .pipe(gulp.dest(styleSourcePath));
// });

//working
gulp.task('styleguide:applystyles', function() {
  return gulp.src(scssRoot)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// gulp.task('app', function() {
//   return gulp.src(['src/app/**/**.*'])
//     .pipe(gulp.dest(outputPath + '/app'));
// });

// gulp.task('watch', ['static', 'template_files', 'app', 'styleguide'], function() {
gulp.task('watch', ['static', 'styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(scssWild, ['styleguide']);
});