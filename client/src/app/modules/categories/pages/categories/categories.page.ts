import { Component, OnInit } from '@angular/core';

import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../categories.service';
import { CreateCategory } from '../../interfaces/create-category.interface';
import { UpdateCategory } from '../../interfaces/update-category.interface';


@Component({
    selector: 'app-categries',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss']
})
export class CategoriesPage implements OnInit {
    categories: Category[] = [];

    createMode = false;
    editMode = false;
    deleteMode = false;
    categoryToUpdate: Category | null = null;
    categoryToDelete: Category | null = null;

    constructor(private categoriesService: CategoriesService) { }

    findCategories() {
        this.categoriesService.findAll({ page: 1, limit: 100 }).subscribe(
            data => this.categories = data.rows,
        );
    }
    
    createCategory(operation: CreateCategory) {
        this.categoriesService.create(operation).subscribe(
            () => this.findCategories()
        );
    }

    updateCategory(operation: UpdateCategory) {
        this.categoriesService.update(operation).subscribe(
            () => this.findCategories()
        );
    }

    deleteCategory(id: number) {
        this.categoriesService.delete(id).subscribe(
            () => this.findCategories()
        );
    }

    enableCreateMode() {
        this.createMode = true;
    }

    disableCreateMode() {
        this.createMode = false;
    }

    enableEditMode(category: Category) {
        this.editMode = true;
        this.categoryToUpdate = category;
    }

    disableEditMode() {
        this.editMode = false;
        this.categoryToUpdate = null;
    }

    enableDeleteMode(category: Category) {
        this.deleteMode = true;
        this.categoryToDelete = category;
    }

    disableDeleteMode() {
        this.deleteMode = false;
        this.categoryToDelete = null;
    }

    ngOnInit() {
        this.findCategories();
    }
}