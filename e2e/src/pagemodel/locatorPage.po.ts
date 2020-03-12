import {browser} from 'protractor';

export class LocatorPage {
  navigateToLocators() {
    return browser.get(browser.baseUrl + '/locators') as Promise<any>;
  }

  navigateToLocator() {
    return browser.get(browser.baseUrl + '/locator') as Promise<any>;
  }
}
