import { Component } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
    updateUserActive: boolean = true;
    updatePasswordActive: boolean = false;

    constructor() { }

    openUpdateProfile() {
        this.updateUserActive = true;
        this.updatePasswordActive = false;
    }

    openUpdatePassword() {
        this.updateUserActive = false;
        this.updatePasswordActive = true;
    }
}