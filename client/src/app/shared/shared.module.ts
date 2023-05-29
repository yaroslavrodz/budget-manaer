import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AppDatePipe } from './pipes/app-date.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppDatePipe,
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AppDatePipe,
        PaginatorComponent
    ],
    providers: [
        DatePipe,
        PaginatorComponent
    ]
})
export class SharedModule { }
