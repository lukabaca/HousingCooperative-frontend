import {LoginPage} from './app.po';
import {browser, by, element} from 'protractor';

describe('login-component', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should header contain "logowanie"', () => {
    const text = element(by.css('.title')).getText();
    console.log(text);
    expect(text).toBe('Logowanie');
  });

  it('should get fields red when they are empty after login button click', () => {
    const loginButton = element(by.css('button'));
    browser.sleep(1000);

    loginButton.click();

    const loginInput = element(by.css('.login'));
    const passwordInput = element(by.css('.password'));

    expect(loginInput.getCssValue('caret-color')).toBe('rgb(244, 67, 54)');
    expect(passwordInput.getCssValue('caret-color')).toBe('rgb(244, 67, 54)');

    browser.sleep(1000);
  });

  it('should get information about wrong credentials"', () => {
    const loginButton = element(by.css('button'));
    const loginInput = element(by.css('.login'));
    const passwordInput = element(by.css('.password'));
    const errorSpan = element(by.css('.error-message'));

    loginInput.sendKeys('ajsdhjkasd@wp.pl');
    browser.sleep(1000);
    passwordInput.sendKeys('13asdas123');
    browser.sleep(1000);

    loginButton.click();

    browser.sleep(1000);

    expect(errorSpan.getText()).toBe('Błędne dane logowania');
  });

});
