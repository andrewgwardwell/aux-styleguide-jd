var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
// var concat = require('gulp-concat');
var outputPath = 'output';
var sourcePath = 'src';
// var jsRoot = sourcePath + '/js/*.*';
// var htmlWild = sourcePath + '/**/*.html';
var styleSourcePath = sourcePath + '/styles';
var scssWild = styleSourcePath + '/**/*.scss';
var scssRoot = styleSourcePath + '/main.scss';
// var bootRoot = 'src/styles/_bootstrap.scss';
var overviewPath = styleSourcePath + '/README.md';

gulp.task('static', function() {
  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest(outputPath + '/fonts'));
});

gulp.task('styleguide:generate', function() {
    return gulp.src(scssWild)
    .pipe(styleguide.generate({
        title: 'Amazon',
        server: true,
        rootPath: outputPath,
        overviewPath: overviewPath
      }))
    .pipe(gulp.dest(outputPath));
});

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

gulp.task('watch', ['static','styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(scssWild, ['styleguide']);
});


// gulp.task('html', function() {
//     return gulp.src(htmlWild)
//         .pipe(gulp.dest(outputPath));
// });

// gulp.task('scss', function() {
//     return gulp.src(scssRoot)
//         .pipe(sass())
//         .pipe(gulp.dest(styleBuildPath));
// });

// gulp.task('js', function() {
//     return gulp.src(jsRoot)
//         .pipe(gulp.dest(jsBuildPath));
// });

// gulp.task('font', function() {
//     return gulp.src(sourcePath + '/fonts/**/*.*')
//         .pipe(gulp.dest(outputPath + '/fonts/'));
// });

// gulp.task('styleguide:generate', function() {
//   return gulp.src(scssWild)
//     .pipe(styleguide.generate({
//         title: 'Amazon',
//         server: true,
//         rootPath: outputPath,
//         overviewPath: overviewPath
//       }))
//     .pipe(gulp.dest(outputPath));
// });
 
// gulp.task('styleguide:applystyles', function() {
//   return gulp.src(scssRoot)
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(styleguide.applyStyles())
//     .pipe(gulp.dest(outputPath));
// });
  
// gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// // Developer mode

// gulp.task('watch', ['html', 'scss', 'styleguide'], function() {
//     gulp.watch(htmlWild, ['html']);
//     gulp.watch(scssWild, ['scss', 'styleguide']);
//     console.log(
//         '\nDeveloper mode!\n\nSC5 Styleguide available at http://localhost:3000/\n'
//     );
// });

// // The basic build task

// gulp.task('default', ['html', 'scss', 'staticStyleguide'], function() {
//     console.log(
//         '\nBuild complete!\n\nFresh build available in directory: ' +
//         buildPath + '\n\nCheckout the build by commanding\n' +
//         '(cd ' + buildPath + '; python -m SimpleHTTPServer)\n' +
//         'and pointing yout browser at http://localhost:8000/\n' +
//         'or http://localhost:8000/styleguide/ for the styleguide\n\n' +
//         'Run gulp with "gulp dev" for developer mode and style guide!\n'
//     );
// });