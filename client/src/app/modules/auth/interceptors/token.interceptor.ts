import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const status = this.authService.getStatus();
        if(status) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${status.token}`
                }
            });
        }

        return next.handle(request);
    }
}