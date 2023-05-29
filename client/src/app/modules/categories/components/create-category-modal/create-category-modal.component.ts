import { Component, Output, EventEmitter} from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { CreateCategory } from '../../interfaces/create-category.interface';

@Component({
    selector: 'app-create-category-modal',
    templateUrl: './create-category-modal.component.html',
    styleUrls: ['./create-category-modal.component.scss']
})
export class CreateCategoryModalComponent {
    @Output() categoryToCreate = new EventEmitter<CreateCategory>();
    @Output() close = new EventEmitter<void>();

    form = new FormGroup({
        name: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12),
            Validators.pattern('^[a-zA-Z0-9]+$'),
        ]))
    });

    get name() { return this.form.get('name'); }

    constructor() { }

    create() {
        this.categoryToCreate.emit(this.form.value as CreateCategory);
        this.close.emit();
    }
    
    cancel() {
        this.close.emit();
    }
}