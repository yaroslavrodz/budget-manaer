import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { OperationsPage } from './pages/operations/operations.page';
import { OperationFilterComponent } from './components/operation-filter/operation-filter.component'
import { OperationListComponent } from './components/operation-list/operation-list.component';
import { CreateOperationModalComponent } from './components/create-operation-modal/create-operation-modal.component';
import { UpdateOperationModalComponent } from './components/update-operation-modal/update-operation-modal.component';
import { DeleteOperationModalComponent } from './components/delete-operation-modal/delete-operation-modal.component';

const routes: Routes = [
    { path: '', component: OperationsPage }
];

@NgModule({
    declarations: [
        OperationsPage,
        OperationFilterComponent,
        OperationListComponent,
        CreateOperationModalComponent,
        UpdateOperationModalComponent,
        DeleteOperationModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    providers: [
    ]
})
export class OperationsModule { }
