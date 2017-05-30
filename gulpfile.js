var gulp = require('gulp');
var del = require('del');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var gulpif = require('gulp-if');
var path = require('path');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var ngConstant = require('gulp-ng-constant');
var karma = require('karma');
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var protractor = require('gulp-protractor').protractor;
var exit = require('gulp-exit');
var argv = require('yargs').argv;
var embedlr = require('gulp-embedlr');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();
var express = require('express');
var livereload = require('connect-livereload');
var livereloadport = 35729;
var serverport = 5000;
var server = express();
server.use(livereload({ port: livereloadport }));
server.use(express.static('./build'));
server.all('/*', function (req, res) {
  res.sendfile('index.html', { root: 'build' });
});

// Configuration

var files = {
  frontendSources: [
    'src/**/!(*.spec).js',
  ],
  frontendStyles: [
    'src/less/main.less',
  ],
  frontendTemplates: [
    'src/app/**/*.tpl.html',
  ],
  frontendVendorAssets: [
    'node_modules/bootstrap/fonts/*',
  ],
  frontendVendorScripts: [
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
  ],
};

var compilationMode = (argv.production === undefined) ? 'dev' : 'prod';
var targetDirectory = 'build/';
var tempDirectory = 'build/';

// Cleanup

function clean() {
  return del(['build', 'bin', 'dist', 'test-results']);
}

// Code validation

function validateFrontendSources() {
  return gulp.src(files.frontendSources)
    .pipe(eslint({ configFile: '.eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function validateGulpfile() {
  return gulp.src(['gulpfile.js'])
    .pipe(eslint({ configFile: '.eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

var codeValidation = gulp.parallel(validateFrontendSources, validateGulpfile);

function copyProjectSourcesFrontend() {
  return gulp.src(files.frontendSources)
    .pipe(gulpif((compilationMode !== 'dev'), ngAnnotate()))
    .pipe(gulp.dest(tempDirectory));
}

function copyVendorSourcesFrontend() {
  return gulp.src(files.frontendVendorScripts, { base: '.' })
    .pipe(gulpif((compilationMode !== 'dev'), ngAnnotate()))
    .pipe(gulp.dest(tempDirectory));
}

var copySourcesFrontend = gulp.parallel(copyProjectSourcesFrontend, copyVendorSourcesFrontend);

function copyVendorAssetsFrontend() {
  return gulp.src(files.frontendVendorAssets)
    .pipe(gulp.dest(targetDirectory + 'fonts'))
    ;
}

var copyAssetsFrontend = gulp.parallel(copyVendorAssetsFrontend);

function compileTemplates() {
  return gulp.src(files.frontendTemplates)
    .pipe(templateCache({
      module: 'ngWebEngineering.templates',
      standalone: true,
    }))
    .pipe(gulpif((compilationMode !== 'dev'), ngAnnotate()))
    .pipe(rename('templates-app.js'))
    .pipe(gulp.dest(tempDirectory + 'app'));
}

function writeConstants() {
  return gulp.src('src/app/config.json')
    .pipe(ngConstant({
      name: 'ngWebEngineering.config',
      deps: [],
      wrap: false,
    }))
    .pipe(rename('config.js'))
    .pipe(gulp.dest(tempDirectory + 'app'));
}

function compileCss() {
  return gulp.src(files.frontendStyles)
    .pipe(less())
    .pipe(gulpif((compilationMode !== 'dev'), cssmin()))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(targetDirectory + 'assets'));
}

function uglifyCode(done) {
  if (compilationMode === 'dev') {
    done();
    return null;
  }

  return gulp.src(files.frontendSources)
    .pipe(uglify())
    .pipe(gulp.dest(targetDirectory + 'assets'));
}

// Unit Tests

function executeUnitTests(done) {
  new karma.Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
  }, done).start();
}

// End-2-End Tests

var selenium = gulp.series(webdriverUpdate, webdriverStandalone);

function executeE2ETests(done) {
  gulp.src(['./e2e-tests/**/*.js'])
    .pipe(protractor({
      configFile: 'e2e-tests/protractor.conf.js',
    }))
    .on('error', function (e) { throw e; })
    .on('end', done)
    .pipe(exit());
}

function processIndexFile() {
  var sources;
  if (compilationMode === 'dev') {
    sources = gulp.src(files.frontendVendorScripts.concat(['./app/**/*.js', './**/*.css']), { read: false, cwd: path.join(__dirname, targetDirectory) });
  } else {
    sources = gulp.src(['./assets/**/*.js', './**/*.css'], { read: false, cwd: path.join(__dirname, targetDirectory) });
  }

  return gulp.src('./src/index.html')
    .pipe(inject(sources, { addRootSlash: false, removeTags: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(targetDirectory));
}

var codeCompilationTesting = gulp.series(gulp.parallel(compileCss, copyAssetsFrontend, copySourcesFrontend, compileTemplates, writeConstants), executeUnitTests, uglifyCode, processIndexFile);
var codeCompilation = gulp.series(gulp.parallel(compileCss, copyAssetsFrontend, copySourcesFrontend, compileTemplates, writeConstants), uglifyCode, processIndexFile);

function liveServer() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
}
function refreshLiveServer() {
  refresh(lrserver);
}

// Common task definition
gulp.task('prepare-e2e', gulp.series(selenium));
gulp.task('e2e', gulp.series(executeE2ETests));
gulp.task('build', gulp.series(clean, codeValidation, codeCompilationTesting));
gulp.task('simpleBuild', gulp.series(clean, codeCompilation));
gulp.task('default', gulp.series('build'));

gulp.task('updateLiveServer', gulp.series('build', refreshLiveServer));
gulp.task('watch', function () {
  gulp.watch(['src/**/*.html'], [
    'updateLiveServer',
  ]);
});
gulp.task('liveServer', gulp.series('build', liveServer, 'watch'));
