var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'test_results/screenshotsReporter',
  filename: 'testsReport.html',
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
      resultsDir: 'test_results/allureReporter'
    }));

    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'test_results/htmlReporter/',
      filePrefix: 'xmlresults'
    }));

    var fs = require('fs-extra');

    fs.emptyDir('test_results/htmlReporter/screenshots/', function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream('test_results/htmlReporter/screenshots/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

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

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');

      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: 'test_results/htmlReporter/',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from('test_results/htmlReporter/xmlresults.xml', testConfig);
    });
  },

  baseUrl: 'https://juliemr.github.io/protractor-demo/'  // Use for interaction with elements intractively
}