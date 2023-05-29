import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { Register } from '../../interfaces/register.interface';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    registrationForm = new FormGroup({
        username: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
            Validators.pattern('^[a-zA-Z0-9]+$'),
        ])),
        email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.email,
        ])),
        password: new FormControl('', Validators.required)
    });
    
    get username() { return this.registrationForm.get('username'); }
    get email() { return this.registrationForm.get('email'); }
    get password() { return this.registrationForm.get('password'); }
    
    constructor(private authService: AuthService) { }

    register(): void {
        this.authService.register(this.registrationForm.value as Register).subscribe();
    }
}
