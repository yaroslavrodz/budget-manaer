import { Component, OnInit } from '@angular/core';

import { SavingsService } from '../../savings.service';
import { SavingType } from '../../enums/saving-type.enum';
import { Saving } from '../../interfaces/saving.interface';
import { CreateSaving } from '../../interfaces/create-saving.interface';
import { UpdateSaving } from '../../interfaces/update-saving.interface';
import { FindSavings } from '../../interfaces/find-savings.interface';

@Component({
    selector: 'app-savings',
    templateUrl: './savings.page.html',
    styleUrls: ['./savings.page.scss']
})
export class SavingsPage implements OnInit {
    savings: Saving[] = [];
    types: SavingType[] = Object.values(SavingType);
    selectedType: SavingType | null = null;

    createMode = false;
    editMode = false;
    deleteMode = false;
    savingToUpdate: Saving | null = null;
    savingToDelete: Saving | null = null;

    constructor(private savingsService: SavingsService) { }
    
    applyType(type: SavingType | null) {
        this.selectedType = type;
        this.findSavings();
    }

    findSavings() {
        const options: FindSavings = {
            page: 1,
            limit: 100,
        }
        if (this.selectedType) {
            options.type = this.selectedType;
        }
        this.savingsService.findAll(options).subscribe(
            data => this.savings = data.rows
        );
    }
    
    createSaving(saving: CreateSaving) {
        this.savingsService.create(saving).subscribe(
            () => this.findSavings()
        );
    }

    updateSaving(saving: UpdateSaving) {
        this.savingsService.update(saving).subscribe(
            () => this.findSavings()
        );
    }

    deleteSaving(id: number) {
        this.savingsService.delete(id).subscribe(
            () => this.findSavings()
        );
    }

    enableCreateMode() {
        this.createMode = true;
    }

    disableCreateMode() {
        this.createMode = false;
    }

    enableEditMode(saving: Saving) {
        this.editMode = true;
        this.savingToUpdate = saving;
    }

    disableEditMode() {
        this.editMode = false;
        this.savingToUpdate = null;
    }
    
    enableDeleteMode(saving: Saving) {
        this.deleteMode = true;
        this.savingToDelete = saving;
    }

    disableDeleteMode() {
        this.deleteMode = false;
        this.savingToDelete = null;
    }

    ngOnInit() {
        this.findSavings();
    }
}