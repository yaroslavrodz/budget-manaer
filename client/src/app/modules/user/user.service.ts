import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { UpdatePassword } from './interfaces/update-password.interface';
import { UpdateUser } from './interfaces/update-user.interface';
import { User } from './interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly url = environment.apiUrl + 'users/';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private notifyService: NotifyService,
    ) { }

    updateUser(options: UpdateUser): Observable<void> {
        return this.http.put<User>(this.url, options).pipe(
            map((user: User) => {
                const status = this.authService.getStatus();
                this.authService.setStatus({
                    ...status!,
                    user
                });
                this.notifyService.showSuccess('User successfully updated')
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    updatePassword(options: UpdatePassword): Observable<void> {
        return this.http.put<void>(this.url + 'password', options).pipe(
            map(() => this.notifyService.showSuccess('Password successfully updated')),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }
}