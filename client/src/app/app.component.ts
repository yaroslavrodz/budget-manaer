import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './modules/auth/auth.service';
import { SavingsService } from './modules/savings/savings.service';
import { Status } from './modules/auth/interfaces/status.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Budget manager';
    status: Status | null = null;
    balance: number | null  = null;

    destroy$ = new Subject();

    constructor(
        private authService: AuthService,
        private savingsService: SavingsService,
    ) { }

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.authService.status$.pipe(
            takeUntil(this.destroy$)).subscribe(status => this.status = status);
            
        this.savingsService.balance$.pipe(
            takeUntil(this.destroy$)).subscribe(balance => this.balance = balance);

        if (this.status) {
            this.savingsService.getBalance().subscribe()
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}