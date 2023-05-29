import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Saving } from '../../interfaces/saving.interface';

@Component({
    selector: 'app-delete-saving-modal',
    templateUrl: './delete-saving-modal.component.html',
    styleUrls: ['./delete-saving-modal.component.scss']
})
export class DeleteSavingModalComponent {
    @Input() saving?: Saving;
    @Output() savingToDeleteId = new EventEmitter<number>();
    @Output() close = new EventEmitter<void>();

    constructor() {}

    delete() {
        this.savingToDeleteId.emit(this.saving?.id),
        this.close.emit()
    }

    cancel(): void {
        this.close.emit();
    }
}
