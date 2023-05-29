import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { Login } from '../../interfaces/login.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
            Validators.pattern('^[a-zA-Z0-9]+$'),
        ])),
        password: new FormControl('', Validators.required)
    });

    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }

    constructor(private authService: AuthService) { }

    login() {
        this.authService.login(this.loginForm.value as Login).subscribe();
    }
}
