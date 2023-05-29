import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss']
})
export class AuthPage {
    loginActive: boolean = true;
    registrationActive: boolean = false;

    constructor() { }
    
    openLogin(): void {
        this.loginActive = true;
        this.registrationActive = false;
    }

    openRegistration(): void {
        this.loginActive = false;
        this.registrationActive = true;
    }
}
