module.exports = function (karma) {
  karma.set({
    basePath: '.',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',

      'src/**/*.js',
      'build/src/app/config.js',
      'build/src/app/templates-app.js',
    ],

    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],

    preprocessors: {
      'src/**/!(*.spec).js': ['coverage'],
    },

    reporters: [
      'coverage',
      'spec',
    ],

    coverageReporter: {
      type: 'html',
      dir: 'test-results/coverage/',
    },

    specReporter: {
      maxLogLines: 5,
    },

    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    autoWatch: false,

    browserNoActivityTimeout: 50000,
    browserDisconnectTimeout: 8000,

    browsers: [
      'Chrome',
      'IE',
    ],
  });
};
