import {browser} from 'protractor';

export class BuildingsPage {
    navigateToBuildings() {
        return browser.get(browser.baseUrl + '/buildings') as Promise<any>;
    }
}

