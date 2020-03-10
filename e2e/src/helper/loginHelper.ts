import {browser, by, element} from 'protractor';

export class LoginHelper {
  private static login = 'admin@onet.pl';
  private static password = '1234';

  static loginToApp() {
    LoginHelper.baseNavigate();

    const loginButton = element(by.css('button'));
    const loginInput = element(by.css('.login'));
    const passwordInput = element(by.css('.password'));

    loginInput.sendKeys(this.login);
    passwordInput.sendKeys(this.password);

    loginButton.click();
  }

  private static baseNavigate() {
    browser.get(browser.baseUrl);
  }
}
