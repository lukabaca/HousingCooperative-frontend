import {browser, by, element} from 'protractor';

export class LoginHelper {
  private static loginAdmin = 'admin@onet.pl';
  private static passwordAdmin = '1234';

  private static loginLocator = 'user@user.pl';
  private static passwordLocator = '1234';

  private static loginButton = element(by.css('button'));
  private static loginInput = element(by.css('.login'));
  private static passwordInput = element(by.css('.password'));

  static loginToAppAsAdmin() {
    LoginHelper.baseNavigate();

    this.loginInput.sendKeys(this.loginAdmin);
    this.passwordInput.sendKeys(this.passwordAdmin);

    this.loginButton.click();
  }

  static loginToAppAsUser() {
    LoginHelper.baseNavigate();

    this.loginInput.sendKeys(this.loginLocator);
    this.passwordInput.sendKeys(this.passwordLocator);

    this.loginButton.click();
  }

  private static baseNavigate() {
    browser.get(browser.baseUrl);
  }
}
