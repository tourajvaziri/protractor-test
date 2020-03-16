import {browser} from 'protractor';
describe('Browser Navigation', () => {
   it('Exampe of back method', () => {
      browser.get('https://material.angularjs.org')
      .then(()=>(browser.get('https://www.protractortest.org/#/faq'))
      .then(() => browser.pause()))
   });
});