import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Saving } from '../../interfaces/saving.interface';

@Component({
    selector: 'app-saving-list',
    templateUrl: './saving-list.component.html',
    styleUrls: ['./saving-list.component.scss']
})
export class SavingListComponent {
    @Input() savings: Saving[] = [];
    @Output() savingToEdit = new EventEmitter<Saving>();
    @Output() savingToDelete = new EventEmitter<Saving>();

    constructor() { }

    edit(saving: Saving) {
        this.savingToEdit.emit(saving);
    }

    delete(saving: Saving) {
        this.savingToDelete.emit(saving);
    }
}