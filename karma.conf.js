// Karma configuration
// Generated on Thu Mar 17 2016 13:34:30 GMT+0100 (Hora estándar romance)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'public/app.js',
      'public/config.js',
      'public/servicios/servicios.js',
      'public/servicios/**/*.js',
      'public/componentes/componentes.js',
      'public/componentes/**/*.js',
      'public/estados/estados.js',
      'public/estados/**/*.js',
      'test/client/**/*.js'
    ],

    /*
    <script src="/angular/angular.min.js"></script>
    <script src="/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="/angular-resource/angular-resource.min.js"></script>
    <script src="/angular-local-storage/dist/angular-local-storage.min.js"></script>
    <script src="/angular-ui-bootstrap/dist/ui-bootstrap.js"></script>
    <script src="/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"></script>
    */

    // list of files to exclude
    exclude: [
      'test/mocha.opts'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage/karma',
      reporters: [
        // { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'json', subdir: 'report-json' }
        // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ]
  })
}
