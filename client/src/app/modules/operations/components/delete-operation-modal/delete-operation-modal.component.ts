import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Operation } from '../../interfaces/operation.interface';

@Component({
    selector: 'app-delete-operation-modal',
    templateUrl: './delete-operation-modal.component.html',
    styleUrls: ['./delete-operation-modal.component.scss']
})
export class DeleteOperationModalComponent {
    @Input() operation?: Operation; 
    @Output() remove = new EventEmitter<number>();
    @Output() close = new EventEmitter<void>();

    constructor() { }

    delete() {
        this.remove.emit(this.operation?.id),
        this.close.emit()
    }

    cancel(): void {
        this.close.emit();
    }
}
