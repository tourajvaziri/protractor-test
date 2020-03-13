import {browser} from 'protractor';
describe('Browser Navigation', () => {
   it('Exampe of back method', () => {
      browser.get('https://material.angularjs.org')
      .then(()=>(browser.get('https://www.protractortest.org/#/faq')))
      .then(()=>(browser.sleep(2000)))
      .then(()=>(browser.navigate().back())) //Back method used here
      .then(()=>(browser.sleep(3000)));
   });
});