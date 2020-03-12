import {LoginHelper} from './helper/loginHelper';
import {browser, by, element} from 'protractor';
import {LoginPage} from './pagemodel/loginPage.po';

describe('security tests', () => {

  beforeEach(() => {
    browser.get(browser.baseUrl + '/login');
  });

  it('should return to login page when trying to go to application pages after logout action', () => {
    LoginHelper.loginToAppAsAdmin();
    browser.sleep(3000);

    const logoutButton = element(by.css('.logout'));
    logoutButton.click();

    browser.sleep(3000);
    browser.get(browser.baseUrl + 'buildings');
    browser.sleep(4000);

    expect(browser.getCurrentUrl()).toContain('/login?returnUr');
  });

  it('should redirect to 403 page after getting forbidden page', () => {
    LoginHelper.loginToAppAsUser();
    browser.sleep(3000);

    browser.get(browser.baseUrl + 'buildings');

    browser.sleep(3000);

    expect(element(by.css('.error-code')).getText()).toBe('403');
    expect(browser.getCurrentUrl()).toContain('/accessForbidden');

    browser.sleep(3000);
  });

});
