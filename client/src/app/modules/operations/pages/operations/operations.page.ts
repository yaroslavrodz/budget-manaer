import { Component, OnInit } from '@angular/core';

import { OperationsService } from '../../operations.service';
import { SavingsService } from 'src/app/modules/savings/savings.service';
import { OperationType } from '../../enums/operation-type.enum';
import { Saving } from 'src/app/modules/savings/interfaces/saving.interface';
import { PageEvent } from 'src/app/shared/interfaces/page-event.interface';
import { OperationsFilter } from '../../interfaces/operations-filter.interface';
import { CreateOperation } from '../../interfaces/create-operation.interface';
import { UpdateOperation } from '../../interfaces/update-operation.interface';
import { Operation } from '../../interfaces/operation.interface';
import { CategoriesService } from 'src/app/modules/categories/categories.service';
import { Category } from 'src/app/modules/categories/interfaces/category.interface';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.page.html',
  styleUrls: ['./operations.page.scss']
})
export class OperationsPage implements OnInit {
    operations: Operation[] = [];
    types: OperationType[] = Object.values(OperationType);
    categories: Category[] = [];
    savings: Saving[] = [];
    
    filter: OperationsFilter = {};

    operationsLength = 0;
    pageIndex = 1;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    visiblePagesRange = 5;
    
    createMode = false;
    editMode = false;
    deleteMode = false;
    operationToUpdate: Operation | null = null;
    operationToDelete: Operation | null = null;

    constructor(
        private operationsService: OperationsService,
        private categoriesService: CategoriesService,
        private savingsService: SavingsService
    ) { }

    applyFilter(filter: OperationsFilter) {
        this.filter = filter;
        this.findOperations();
    }

    applyPage(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.findOperations();
    }

    findOperations() {
        this.operationsService.findAll({
            page: this.pageIndex,
            limit: this.pageSize,
            filter: this.filter
        }).subscribe(
            data => {
                this.operations = data.rows;
                this.operationsLength = data.count;
            }
        );
    }

    createOperation(operation: CreateOperation) {
        this.operationsService.create(operation).subscribe(
            () => this.findOperations()
        );
    }

    updateOperation(operation: UpdateOperation) {
        this.operationsService.update(operation).subscribe(
            () => this.findOperations()
        );
    }

    deleteOperation(id: number) {
        this.operationsService.delete(id).subscribe(
            () => this.findOperations()
        );
    }

    enableCreateMode() {
        this.createMode = true;
    }

    disableCreateMode() {
        this.createMode = false;
    }

    enableEditMode(opreation: Operation) {
        this.editMode = true;
        this.operationToUpdate = opreation;
    }

    disableEditMode() {
        this.editMode = false;
        this.operationToUpdate = null;
    }
    
    enableDeleteMode(operation: Operation) {
        this.deleteMode = true;
        this.operationToDelete = operation;
    }

    disableDeleteMode() {
        this.deleteMode = false;
        this.operationToDelete = null;
    }

    ngOnInit() {
        this.findOperations();
        this.savingsService.findAll({ page: 1, limit: 100 }).subscribe(
            data => this.savings = data.rows,
        );
        this.categoriesService.findAll({ page: 1, limit: 100 }).subscribe(
            data => this.categories = data.rows,
        );
    }
}