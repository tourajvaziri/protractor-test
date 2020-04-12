import { browser, element, by, $$ } from 'protractor';
import {Workbook, Row, Cell} from 'exceljs';

describe('Browser Navigation', () => {
   it('should greet the named user', async function() {
      debugger;
      await browser.get('http://www.angularjs.org');
  
      await element(by.model('yourName')).sendKeys('Julie');
  
      var greeting = element(by.binding('yourName'));
  
      expect(await greeting.getText()).toEqual('Hello Julie!');
  });

 

  xit('calculator test', async function() {
   await browser.get("https://juliemr.github.io/protractor-demo/");
   await element($$(".input-small:nth-child(1)")).click();
   await element($$(".input-small:nth-child(1)")).sendKeys("asd");

   var asd = await $$(".input-small:nth-child(1)").getText();
   console.log("VALUE IS: " + asd);

});

xit('excel test', async function() {
   var workbook = new Workbook();
   console.log("TAHER111:" );
   await workbook.xlsx.readFile("./src/data1.xlsx").then(async function () {
       var inboundWorksheet = workbook.getWorksheet(2);
    //   console.log("TAHER: " + rowObject.getCell(1).toString());
       //Data.firstName = rowObject.getCell(1).toString();

       var rowObject = inboundWorksheet.getRow(1);
       console.log("TAHER: " + rowObject.getCell(2).toString());
   });
}); 

xit('Bad test with error', async function() {
   await browser.get("https://juliemr.github.io/protractor-demo/");
   await element($$(".input-small:nth-child(1)")).click();
   await element($$(".input-small:nth-child(1)")).sendKeys("asd");

   var asd = await $$(".input-small:nth-child(122)").getText();
   console.log("VALUE IS: " + asd);

});

});