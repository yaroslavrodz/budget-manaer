import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate() {
        const status = this.authService.getStatus();
        if (status) {
            return true;
        }

        this.router.navigate(['/auth']);
        return false;
    }
}
