import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Category } from '../../interfaces/category.interface';
import { UpdateCategory } from '../../interfaces/update-category.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-update-category-modal',
    templateUrl: './update-category-modal.component.html',
    styleUrls: ['./update-category-modal.component.scss']
})
export class UpdateCategoryModalComponent implements OnInit {
    @Input() category?: Category;
    @Output() categoryToUpdate = new EventEmitter<UpdateCategory>();
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

    update() {
        this.categoryToUpdate.emit({
            id: this.category?.id,
            userId: this.category?.userId,
            ...this.form.value
        } as UpdateCategory);
        this.close.emit();
    }

    cancel() {
        this.close.emit();
    }

    ngOnInit() {
        this.form.patchValue({
            name: this.category?.name
        });
    }
}