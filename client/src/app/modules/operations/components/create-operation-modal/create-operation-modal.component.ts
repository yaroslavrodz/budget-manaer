import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { Saving } from 'src/app/modules/savings/interfaces/saving.interface';
import { Category } from 'src/app/modules/categories/interfaces/category.interface';
import { CreateOperation } from '../../interfaces/create-operation.interface';
import { OperationType } from '../../enums/operation-type.enum';

@Component({
    selector: 'app-create-operation-modal',
    templateUrl: './create-operation-modal.component.html',
    styleUrls: ['./create-operation-modal.component.scss']
})
export class CreateOperationModalComponent {
    @Input() types: OperationType[] = [];
    @Input() categories: Category[] = [];
    @Input() savings: Saving[] = [];
    @Output() operationToCreate = new EventEmitter<CreateOperation>();
    @Output() close = new EventEmitter<void>();

    form = new FormGroup({
        name: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
            Validators.pattern('^[a-zA-Z0-9]+$'),
        ])),
        type: new FormControl('', Validators.compose([
            Validators.required,
        ])),
        amount: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]+([.]{1}[0-9]{1,2})?$'),
        ])),
        categoryId: new FormControl('', Validators.compose([
            Validators.required,
        ])),
        savingId: new FormControl('', Validators.compose([
            Validators.required,
        ]))
    });
    
    get name() { return this.form.get('name'); }
    get amount() { return this.form.get('amount'); }

    constructor() { }

    create() {
        this.operationToCreate.emit(
            this.form.value as unknown as CreateOperation
        );
        this.close.emit();
    }

    cancel() {
        this.close.emit();
    }
}