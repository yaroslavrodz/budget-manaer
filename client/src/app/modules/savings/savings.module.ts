import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SavingsPage } from './pages/savings/savings.page';
import { CreateSavingModalComponent } from './components/create-saving-modal/create-saving-modal.component';
import { SavingFilterComponent } from './components/saving-filter/saving-filter.component';
import { SavingListComponent } from './components/savings-list/saving-list.component';
import { UpdateSavingModalComponent } from './components/update-saving-modal/update-saving-modal.component';
import { DeleteSavingModalComponent } from './components/delete-saving-modal/delete-saving-modal.component';

const routes: Routes = [
    { path: '', component: SavingsPage }
];

@NgModule({
    declarations: [
        SavingsPage,
        CreateSavingModalComponent,
        SavingFilterComponent,
        SavingListComponent,
        UpdateSavingModalComponent,
        DeleteSavingModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
    ]
})
export class SavingsModule { }