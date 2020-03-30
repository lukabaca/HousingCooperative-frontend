import {BuildingsPage} from './pagemodel/BuildingsPage.po';
import {LoginHelper} from './helper/loginHelper';
import {$$, browser, by, element} from 'protractor';

describe('buildings-component tests', () => {
  let page: BuildingsPage;

  beforeAll(() => {
    LoginHelper.loginToAppAsAdmin();
    browser.sleep(3000);
  });

  beforeEach(() => {
    page = new BuildingsPage();
  });

  it('should header contain "Budynki" on buildings page', () => {
    page.navigateToBuildings();
    const header = element(by.css('.header-title')).getText();
    browser.sleep(2000);
    expect(header).toBe('Budynki');
    browser.sleep(2000);
  });

  it('should open building addition modal', () => {
    page.navigateToBuildings();
    browser.sleep(2000);
    const registerButton = element(by.css('.add-building-btn'));
    registerButton.click();
    browser.sleep(2000);
    const modal = element(by.css('.add-building-modal'));
    expect(modal.isPresent()).toBe(true);
  });

  it('should add building', () => {
    page.navigateToBuildings();
    browser.sleep(2000);
    const registerButton = element(by.css('.add-building-btn'));

    let tableElementsBeforeActionCount;
    $$('table tbody tr').count().then((count) => {
      tableElementsBeforeActionCount = count;
    });

    registerButton.click().then(() => {
      browser.wait(element(by.css('.add-building-modal')).isDisplayed, 5000);
    }).then(() => {
      element(by.css('[name="address"]')).sendKeys('address');
      browser.sleep(1000);
      element(by.css('[name="city"]')).sendKeys('city');
      browser.sleep(1000);
      element(by.css('[name="number"]')).sendKeys('123');
      browser.sleep(1000);

      element(by.css('#add-building-button-modal')).click();
      browser.sleep(3000);

      let tableElementsAfterActionCount;
      $$('table tbody tr').count().then((count) => {
        tableElementsAfterActionCount = count;
        expect(tableElementsAfterActionCount).toBe(tableElementsBeforeActionCount + 1);
      });

    });
  });

  it('should add building button be disabled when required values are empty', () => {
    page.navigateToBuildings();
    browser.sleep(2000);
    const registerButton = element(by.css('.add-building-btn'));
    const addBuildingButton = element(by.css('#add-building-button-modal'));

    registerButton.click().then(() => {
      browser.wait(element(by.css('.add-building-modal')).isDisplayed, 5000);
    }).then(() => {
        expect(addBuildingButton.getAttribute('disabled')).toEqual('true');
    });
  });

  it('should add building button be disabled when address field is empty', () => {
    page.navigateToBuildings();
    browser.sleep(2000);
    const registerButton = element(by.css('.add-building-btn'));
    const addBuildingButton = element(by.css('#add-building-button-modal'));

    registerButton.click().then(() => {
      browser.wait(element(by.css('.add-building-modal')).isDisplayed, 5000);
    }).then(() => {
      element(by.css('[name="city"]')).sendKeys('city');
      browser.sleep(1000);
      element(by.css('[name="number"]')).sendKeys('1');
      browser.sleep(1000);

      expect(addBuildingButton.getAttribute('disabled')).toEqual('true');
    });
  });

  it('should add building button be disabled when building number field is empty', () => {
    page.navigateToBuildings();
    browser.sleep(2000);
    const registerButton = element(by.css('.add-building-btn'));
    const addBuildingButton = element(by.css('#add-building-button-modal'));

    registerButton.click().then(() => {
      browser.wait(element(by.css('.add-building-modal')).isDisplayed, 5000);
    }).then(() => {
      element(by.css('[name="address"]')).sendKeys('address');
      browser.sleep(1000);
      element(by.css('[name="city"]')).sendKeys('city');
      browser.sleep(1000);

      expect(addBuildingButton.getAttribute('disabled')).toEqual('true');
    });
  });

  it('should add building button be disabled when city field is empty', () => {
    page.navigateToBuildings();
    browser.sleep(2000);
    const registerButton = element(by.css('.add-building-btn'));
    const addBuildingButton = element(by.css('#add-building-button-modal'));

    registerButton.click().then(() => {
      browser.wait(element(by.css('.add-building-modal')).isDisplayed, 5000);
    }).then(() => {
      element(by.css('[name="address"]')).sendKeys('address');
      browser.sleep(1000);
      element(by.css('[name="number"]')).sendKeys('123');
      browser.sleep(1000);

      expect(addBuildingButton.getAttribute('disabled')).toEqual('true');
    });
  });

});
