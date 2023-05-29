import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Operation } from '../../interfaces/operation.interface';

@Component({
    selector: 'app-operation-list',
    templateUrl: './operation-list.component.html',
    styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent {
    @Input() operations: Operation[] = [];
    @Output() operationToEdit = new EventEmitter<Operation>();
    @Output() operationToDelete = new EventEmitter<Operation>();

    constructor() { }

    update(operation: Operation): void {
        this.operationToEdit.emit(operation);
    }

    delete(operation: Operation): void {
        this.operationToDelete.emit(operation);
    }
}