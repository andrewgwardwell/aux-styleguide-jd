var gulp = require('gulp'),
    styleguide = require('sc5-styleguide'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    rename = require('gulp-rename'),
    //@HELP additional reqs for the config files
    add_deps = require('./gulp_extras/add_deps'),
    scripts_config = require('./gulp_extras/scripts_config'),
    deps = require('./gulp_extras/deps');


//helpers
var outputPath = 'output',
 sourcePath = 'src',
 styleSourcePath = 'node_modules/app/src/app/styles',
 scssWild = styleSourcePath + '/**/*.scss',
 scssRoot = styleSourcePath + '/main.scss',
 allScss = styleSourcePath + '/all.scss',
 bowerMix = styleSourcePath + '/bower.scss',
 bower = sourcePath + '/app/src/bower_components/',
 overviewPath = styleSourcePath + '/README.md';

// @HELP I have attemped to pull all bower dependencies into the build (but I ran into an issue with bootstrap requiring additional files (.tpls.min.js)). That was an impass for me.
// gulp.task('bower_deps, ['bower'],function() {
//   return gulp.src(mainBowerFiles({ paths: 'src/app', filter: /\.js/}))
//     // .pipe(uglify({outSourceMap: true}))
//     .pipe(plumber())
//     .pipe(concat('bower_deps.js'))
//     .pipe(gulp.dest(outputPath + '/app'));
// });

// gulp.task('bower', function() {
//   return bower({ cwd: '/Users/AWardwell/Sites/amazon_style/src/app' });
// });

//imgs, fonts, etc
gulp.task('static', function() {
  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest(outputPath + '/fonts'));
});

// //moving all the temps from the app into a tpl dump
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
        commonClass: 'sample-app'
        // filesConfig: scripts_config.config,
        //This means that we loose the benefit of the shadow DOM. @HELP. Commenting this out will display issue clearly (directives broken and styles from app bleeding into the styleguide).
        // disableEncapsulation: true,
        //Adding dependencies that the app needs here as well (seems to add them to the shadow dom, but js is not found). @HELP
        // additionalNgDependencies: deps.deps,
        //This is the only place I have found to get the deps to the . @HELP
        // extraHead: add_deps.scripts.join('')
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
//   return gulp.src(['node_modules/app/**/**.*'])
//     .pipe(gulp.dest(outputPath + '/app'));
// });

// gulp.task('watch', ['static', 'template_files', 'app', 'styleguide'], function() {
gulp.task('watch', ['static', 'styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(scssWild, ['styleguide']);
});