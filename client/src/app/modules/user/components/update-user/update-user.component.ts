import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserService } from '../../user.service';
import { UpdateUser } from '../../interfaces/update-user.interface';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
    form = new FormGroup({
        username: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12),
            Validators.pattern('^[a-zA-Z0-9]+$'),
        ])),
        email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.email
        ])),
    });
    
    get username() { return this.form.get('username'); }
    get email() { return this.form.get('email'); }

    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    update() {
        this.userService.updateUser(this.form.value as UpdateUser).subscribe();
    }
    
    ngOnInit() {
        const status = this.authService.getStatus();
        if (status) {
            const user = status.user; 
            this.form.patchValue({
                username: user.username,
                email: user.email
            });
        }
    }
}