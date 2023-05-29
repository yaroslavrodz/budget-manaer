import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { Saving } from 'src/app/modules/savings/interfaces/saving.interface';
import { Category } from 'src/app/modules/categories/interfaces/category.interface';
import { OperationsFilter } from '../../interfaces/operations-filter.interface';
import { OperationType } from '../../enums/operation-type.enum';

@Component({
    selector: 'app-operation-filter',
    templateUrl: './operation-filter.component.html',
    styleUrls: ['./operation-filter.component.scss']
})
export class OperationFilterComponent {
    @Input() types: OperationType[] = [];
    @Input() savings: Saving[] = [];
    @Input() categories: Category[] = [];
    @Output() applyFilter = new EventEmitter<OperationsFilter>();

    filter: OperationsFilter = {};

    constructor() { }
    
    apply() {
        this.applyFilter.emit(this.filter);
    }
}