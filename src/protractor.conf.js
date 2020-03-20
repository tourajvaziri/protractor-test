var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  reportOnlyFailedSpecs: true,
  captureOnlyFailedSpecs: true
});

exports.config = {
  framework: 'jasmine', //Type of Framework used 
  directConnect: true, // Set to false if you like to run Selenium server manually
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../dist/out-tsc/home-spec.js'], //Name of the Specfile

  capabilites: {
    'browserName': 'chrome'
  },

  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare() {
    jasmine.getEnv().addReporter(reporter);
    require('ts-node').register({
      project: require('path').join(__dirname, '../tsconfig.json') // Relative path of tsconfig.json file 
    });

    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'target/allure'
    }));
  },

  // Check what this is
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  baseUrl: 'https://juliemr.github.io/protractor-demo/'  // Use for interaction with elements intractively
}