import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Operation } from '../../interfaces/operation.interface';
import { Saving } from 'src/app/modules/savings/interfaces/saving.interface';
import { Category } from 'src/app/modules/categories/interfaces/category.interface';
import { OperationType } from '../../enums/operation-type.enum';
import { UpdateOperation } from '../../interfaces/update-operation.interface';

@Component({
    selector: 'app-update-operation-modal',
    templateUrl: './update-operation-modal.component.html',
    styleUrls: ['./update-operation-modal.component.scss']
})
export class UpdateOperationModalComponent implements OnInit {
    @Input() operation?: Operation;
    @Input() types: OperationType[] = [];
    @Input() categories: Category[] = [];
    @Input() savings: Saving[] = [];
    @Output() operationToUpdate = new EventEmitter<UpdateOperation>();
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
   
    constructor() {}

    update() {
        this.operationToUpdate.emit({
            id: this.operation?.id,
            userId: this.operation?.userId,
            ...this.form.value
        } as unknown as UpdateOperation);
        this.close.emit();
    }

    cancel() {
        this.close.emit();
    }

    ngOnInit() {
        this.form.patchValue({
            name: this.operation?.name,
            type: this.operation?.type,
            amount: String(this.operation?.amount),
            savingId: String(this.operation?.saving.id),
            categoryId: String(this.operation?.category.id),
        })
    }
}