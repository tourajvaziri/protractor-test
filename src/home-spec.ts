import { browser } from 'protractor';
describe('Browser Navigation', () => {
   it('Exampe of back method', () => {
      browser.get('https://material.angularjs.org')
         .then(() => (browser.get('https://www.protractortest.org/#/faq'))
            .then(() => browser.explore())) // Use for interaction with elements intractively
      // .then(() => browser.debugger()) // Use when debugging before and element not found  
      // .then(() => browser.pause())) // Use when debugging before and element not found  (YOU THIS ONE Recommended)
   });
});