import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { NotifyService } from 'src/app/shared/services/notify.service';
import { CreateSaving } from './interfaces/create-saving.interface';
import { FindSavings } from './interfaces/find-savings.interface';
import { UpdateSaving } from './interfaces/update-saving.interface';
import { Saving } from './interfaces/saving.interface';

@Injectable({
    providedIn: 'root'
})
export class SavingsService {
    private readonly url = environment.apiUrl + 'savings/';
    balance$ = new BehaviorSubject<number | null>(null);
    
    constructor(
        private http: HttpClient,
        private notifyService: NotifyService,
    ) { }

    create(saving: CreateSaving): Observable<Saving> {
        return this.http.post<Saving>(this.url, saving).pipe(
            map(saving => {
                this.notifyService.showSuccess('Saving successfully created');
                this.getBalance().subscribe();
                return saving;
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    findAll(options: FindSavings): Observable<{ count: number, rows: Saving[] }> {
        return this.http.get<{ count: number, rows: Saving[] }>(this.url, {
            params: { ...options }
        }).pipe(
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    update(saving: UpdateSaving): Observable<void> {
        return this.http.put<void>(this.url, saving).pipe(
            map(() => {
                this.notifyService.showSuccess('Saving successfully updated');
                this.getBalance().subscribe();
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error
            })
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url, { params: { id } }).pipe(
            map(() => {
                this.notifyService.showSuccess('Saving successfully deleted');
                this.getBalance().subscribe();
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error
            })
        );
    }

    getBalance(): Observable<void> {
        return this.http.get<number>(this.url + 'balance').pipe(
            map(value => this.balance$.next(value)),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error
            })
        );
    }
}
