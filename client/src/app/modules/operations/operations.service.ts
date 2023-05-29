import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { NotifyService } from 'src/app/shared/services/notify.service';
import { SavingsService } from '../savings/savings.service';
import { CreateOperation } from './interfaces/create-operation.interface';
import { UpdateOperation } from './interfaces/update-operation.interface';
import { Operation } from './interfaces/operation.interface';
import { FindOperations } from './interfaces/find-operations.interface';

@Injectable({
    providedIn: 'root'
})
export class OperationsService {
    private readonly url = environment.apiUrl + 'operations/';
    
    constructor(
        private http: HttpClient,
        private savingsService: SavingsService,
        private notifyService: NotifyService,
    ) { }
 
    create(operation: CreateOperation): Observable<Operation> {
        return this.http.post<Operation>(this.url, operation).pipe(
            map(operation => {
                this.notifyService.showSuccess('Operation successfully created');
                this.savingsService.getBalance().subscribe();
                return operation;
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    findAll(options: FindOperations): Observable<{ count: number, rows: Operation[] }> {
        return this.http.get<{ count: number, rows: Operation[] }>(this.url, {
            params: {
                ...options,
                filter: JSON.stringify(options.filter)
            }
        }).pipe(
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }


    update(dto: UpdateOperation): Observable<void> {
        return this.http.put<void>(this.url, dto).pipe(
            map(() => {
                this.notifyService.showSuccess('Operation successfully updated');
                this.savingsService.getBalance().subscribe();
            }), 
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    delete(id: number) {
        return this.http.delete<void>(this.url, {
            params: { id }
        }).pipe(
            map(() => {
                this.notifyService.showSuccess('Operation successfully deleted');
                this.savingsService.getBalance().subscribe();
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }
}