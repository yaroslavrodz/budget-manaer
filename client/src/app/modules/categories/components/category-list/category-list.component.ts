import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../interfaces/category.interface';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
    @Input() categories: Category[] = [];
    @Output() categoryToEdit = new EventEmitter<Category>();
    @Output() categoryToDelete = new EventEmitter<Category>();

    constructor() { }

    update(category: Category) {
        this.categoryToEdit.emit(category);
    }

    delete(category: Category) {
        this.categoryToDelete.emit(category);
    }
}