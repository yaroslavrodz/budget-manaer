import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Saving } from '../../interfaces/saving.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateSaving } from '../../interfaces/update-saving.interface';
import { SavingType } from '../../enums/saving-type.enum';

@Component({
    selector: 'app-update-saving-modal',
    templateUrl: './update-saving-modal.component.html',
    styleUrls: ['./update-saving-modal.component.scss']
})
export class UpdateSavingModalComponent {
    @Input() saving?: Saving;
    @Input() types: SavingType[] = [];
    @Output() savingToUpdate = new EventEmitter<UpdateSaving>();
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
    
    update() {
        this.savingToUpdate.emit({
            id: this.saving?.id,
            userId: this.saving?.userId,
            ...this.form.value
        } as unknown as UpdateSaving);
        this.close.emit();
    }

    cancel(): void {
        this.close.emit();
    }

    ngOnInit() {
        this.form.patchValue({
            name: this.saving?.name,
            type: this.saving?.type,
            amount: String(this.saving?.amount),
        })
    }
}
