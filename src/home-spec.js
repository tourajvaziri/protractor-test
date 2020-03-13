"use strict";
exports.__esModule = true;
var protractor_1 = require("protractor");
describe('Browser Navigation', function () {
    it('Exampe of back method', function () {
        protractor_1.browser.get('https://material.angularjs.org')
            .then(function () { return (protractor_1.browser.get('https://www.protractortest.org/#/faq')); })
            .then(function () { return (protractor_1.browser.sleep(2000)); })
            .then(function () { return (protractor_1.browser.navigate().back()); }) //Back method used here
            .then(function () { return (protractor_1.browser.sleep(3000)); });
    });
});
