import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment'; 
import { SavingsService } from 'src/app/modules/savings/savings.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Status } from './interfaces/status.interface';
import { Login } from './interfaces/login.interface';
import { Register } from './interfaces/register.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly url = environment.apiUrl + 'auth/';
    private readonly stasusKey = 'status';
    status$: BehaviorSubject<Status | null> = 
        new BehaviorSubject<Status | null>(this.getStatusFromStorage());;

    constructor(
        private http: HttpClient,
        private router: Router,
        private savingsService: SavingsService,
        private notifyService: NotifyService,
    ) { }

    getStatusFromStorage(): Status | null {
        const status = localStorage.getItem(this.stasusKey);
        if (!status) {
            return null;
        }
        return JSON.parse(status);
    }

    getStatus(): Status | null {
        return this.status$.getValue();
    }

    setStatus(status: Status | null) {
        localStorage.setItem(this.stasusKey, JSON.stringify(status));
        this.status$.next(status);
    }

    login(login: Login): Observable<void> {
        return this.http.post<Status>(this.url + 'login', login).pipe(
            map(status => {
                this.setStatus(status);
                this.savingsService.getBalance().subscribe();
                this.notifyService.showSuccess('Logged in');
                this.router.navigate(['/operations']);
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    logout() {
        this.setStatus(null);
        this.savingsService.balance$.next(null);
        this.router.navigate(['/auth']);
    }

    register(register: Register): Observable<void> { 
        return this.http.post<Status>(this.url + 'register', register).pipe(
            map(status => {
                this.setStatus(status);
                this.savingsService.getBalance().subscribe();
                this.notifyService.showSuccess('Account successfully registrated');
                this.router.navigate(['/operations']);
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }
}