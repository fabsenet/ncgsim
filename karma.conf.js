// Karma configuration
// Generated on Tue Mar 18 2014 21:44:03 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'NCGSim/Scripts/jquery*.js',
      'NCGSim/Scripts/angular.js',
	  
      'NCGSim/Scripts/*.js',
      'NCGSim/Scripts/**/*.js',

      'NCGSim/lib/jasmine-2.0.0/jasmine.js',
      //'NCGSim/lib/**/*.js',
      //'NCGSim/lib/*.js',
      
	  'NCGSim/Controller/*.js',
	  'NCGSim/Directives/*.js',
	  
      'NCGSim/Model/*.js',
      'NCGSim/Model/UnitTests/*.js',
	  
      //'NCGSim/**/*.js',
      {pattern:'NCGSim/**/*', included:false}
    ],


    // list of files to exclude
    exclude: [
      '**/angular-scenario.js',
      '**/*.intellisense.js',
      '**/*.min.js',
   //   '**/*.js.map'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//    browsers: ['Chrome', 'IE', 'ChromeCanary', 'Firefox', 'PhantomJS'],
    browsers: ['ChromeCanary','PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
