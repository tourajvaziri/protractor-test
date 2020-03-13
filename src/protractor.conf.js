exports.config = {
    framework: 'jasmine', //Type of Framework used 
    directConnect:false,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../src/home-spec.js'], //Name of the Specfile
    onPrepare() { 
          require('ts-node').register({ 
          project: require('path').join(__dirname, '../tsconfig.json') // Relative path of tsconfig.json file 
        });
    } 
}