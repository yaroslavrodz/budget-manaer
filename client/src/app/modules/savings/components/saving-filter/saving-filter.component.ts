import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SavingType } from '../../enums/saving-type.enum';

@Component({
    selector: 'app-saving-filter',
    templateUrl: './saving-filter.component.html',
    styleUrls: ['./saving-filter.component.scss']
})
export class SavingFilterComponent {
    @Input() types: SavingType[] = [];
    @Output() applyType = new EventEmitter<SavingType | null>();

    selectedType: SavingType | null = null;

    constructor() { }

    apply() {
        this.applyType.emit(this.selectedType);
    }
}