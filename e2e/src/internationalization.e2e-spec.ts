import {LoginHelper} from './helper/loginHelper';
import {browser, by, element} from 'protractor';

describe('internationalization tests', () => {

  beforeAll(() => {
    LoginHelper.loginToAppAsAdmin();
    browser.sleep(3000);
  });

  it('should change language from pl to en on top navbar', () => {
    const enButton = element(by.css('.translate-en-btn'));
    const plButton = element(by.css('.translate-pl-btn'));

    plButton.click();
    browser.sleep(2000);

    expect(element(by.css('.logo')).getText()).toBe('Spółdzielnia');
    expect(element(by.css('.logout')).getText()).toBe('Wyloguj się');

    enButton.click();
    browser.sleep(2000);

    expect(element(by.css('.logo')).getText()).toBe('Housing Cooperative');
    expect(element(by.css('.logout')).getText()).toBe('Sign out');
  });

});
