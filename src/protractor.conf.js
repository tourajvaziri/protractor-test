exports.config = {
    framework: 'jasmine', //Type of Framework used 
    directConnect: true, // Set to false if you like to run Selenium server manually
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../dist/out-tsc/home-spec.js'], //Name of the Specfile

    capabilites: {
        'browserName': 'chrome'
    },

    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, '../tsconfig.json') // Relative path of tsconfig.json file 
        });
    },

    // Check what this is
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    baseUrl: 'https://material.angularjs.org'  // Use for interaction with elements intractively
}