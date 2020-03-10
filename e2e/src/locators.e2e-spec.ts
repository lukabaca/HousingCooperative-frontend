import {browser, by, element} from 'protractor';
import {LocatorPage} from './pagemodel/locatorPage.po';
import {LoginHelper} from './helper/loginHelper';

describe('locator-component', () => {
  let page: LocatorPage;

  beforeAll(() => {
    LoginHelper.loginToApp();
    browser.sleep(3000);
  });

  beforeEach(() => {
    page = new LocatorPage();
  });

  it('should header contain "Lokatorzy" on locators page', () => {
    page.navigateToLocators();

    const header = element(by.css('.header-title')).getText();

    browser.sleep(1000);

    expect(header).toBe('Lokatorzy');

    browser.sleep(1000);
  });

  it('should go to user registration page', () => {
    page.navigateToLocators();

    const registerUserButton = element(by.css('.register-user-button'));
    registerUserButton.click();

    browser.sleep(2000);

    const header = element(by.css('.header-title')).getText();

    expect(header).toBe('Rejestrowanie lokatora');

    expect(element(by.css('[name="email"]')).getAttribute('placeholder')).toBe('Email');
    expect(element(by.css('[name="password"]')).getAttribute('placeholder')).toBe('Hasło');
    expect(element(by.css('[name="name"]')).getAttribute('placeholder')).toBe('Imię');
    expect(element(by.css('[name="surname"]')).getAttribute('placeholder')).toBe('Nazwisko');
    expect(element(by.css('[name="birthDate"]')).getAttribute('placeholder')).toBe('Data urodzenia');
  });

  it('should validate empty fields on user registration', () => {
    page.navigateToLocator();
    browser.sleep(3000);

    const registerButton = element(by.css('.register-btn'));
    registerButton.click();

    browser.sleep(3000);

    expect(element(by.css('.invalid-feedback-captcha')).getText()).toBe('Udowodnij, że nie jesteś robotem');

    browser.sleep(2000);
  });

});
