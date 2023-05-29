import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesPage } from './pages/categories/categories.page';
import { CreateCategoryModalComponent } from './components/create-category-modal/create-category-modal.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UpdateCategoryModalComponent } from './components/update-category-modal/update-category-modal.component';
import { DeleteCategoryModalComponent } from './components/delete-category-modal/delete-category-modal.component';

const routes: Routes = [
    { path: '', component: CategoriesPage }
];

@NgModule({
    declarations: [
        CategoriesPage,
        CategoryListComponent,
        CreateCategoryModalComponent,
        UpdateCategoryModalComponent,
        DeleteCategoryModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
    ]
})
export class CategoriesModule { }