import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {
    constructor(private toastr: ToastrService) { }

    showSuccess(message: string): void {
        this.toastr.success(message);
    }

    showError(message: string | string[]): void {
        if (typeof message === 'string') {
            this.toastr.error(message);
        }
        else {
            this.toastr.error(message.join('\n'));
        }
    }
}