import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { SavingType } from '../../enums/saving-type.enum';
import { CreateSaving } from '../../interfaces/create-saving.interface';

@Component({
    selector: 'app-create-saving-modal',
    templateUrl: './create-saving-modal.component.html',
    styleUrls: ['./create-saving-modal.component.scss']
})
export class CreateSavingModalComponent {
    @Input() types: SavingType[] = [];
    @Output() savingToCreate = new EventEmitter<CreateSaving>();
    @Output() close = new EventEmitter<void>();

    form = new FormGroup({
        name: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12),
            Validators.pattern('^[a-zA-Z0-9]+$'),
        ])),
        type: new FormControl('', Validators.compose([
            Validators.required,
        ])),
        amount: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]+([.]{1}[0-9]{1,2})?$'),
        ]))
    });

    get name() { return this.form.get('name'); }
    get amount() { return this.form.get('amount'); }

    constructor() { }

    create() {
        this.savingToCreate.emit(this.form.value as unknown as CreateSaving);
        this.close.emit();
    }
    
    cancel() {
        this.close.emit();
    }
}