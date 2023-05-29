import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsPage } from '../user/pages/settings/settings.page';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdatePasswordComponent } from '../user/components/update-password/update-password.component';

const routes: Routes = [
    { path: '', component: SettingsPage },
];

@NgModule({
    declarations: [
        SettingsPage,
        UpdateUserComponent,
        UpdatePasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
    ]
})
export class UserModule { }
