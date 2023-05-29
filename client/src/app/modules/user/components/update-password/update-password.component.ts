import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { UserService } from 'src/app/modules/user/user.service';
import { UpdatePassword } from '../../interfaces/update-password.interface';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
    form = new FormGroup({
        newPassword: new FormControl('', Validators.compose([
            Validators.required
        ])),
        currentPassword: new FormControl('', Validators.compose([
            Validators.required
        ]))
    });

    get newPassword() { return this.form.get('newPassword'); }
    get currentPassword() { return this.form.get('currentPassword'); }

    constructor(private userService: UserService) { }

    updatePassword() {
        this.userService.updatePassword(this.form.value as UpdatePassword).subscribe(
            () => this.form.reset(),
        );
    }
}