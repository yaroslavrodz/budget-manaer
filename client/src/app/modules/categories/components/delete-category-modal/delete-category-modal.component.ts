import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../../interfaces/category.interface';

@Component({
    selector: 'app-delete-category-modal',
    templateUrl: './delete-category-modal.component.html',
    styleUrls: ['./delete-category-modal.component.scss']
})
export class DeleteCategoryModalComponent {
    @Input() category?: Category;
    @Output() categoryToDeleteId = new EventEmitter<number>();
    @Output() close = new EventEmitter<void>();

    constructor() { }
    
    delete() {
        this.categoryToDeleteId.emit(this.category?.id),
        this.close.emit()
    }

    cancel() {
        this.close.emit();
    }
}
