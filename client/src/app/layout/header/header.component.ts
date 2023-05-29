import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Status } from 'src/app/modules/auth/interfaces/status.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() status: Status | null = null;
    @Input() balance: number | null = null;
    @Output() logout = new EventEmitter<void>();

    constructor() { }

    signout() {
        this.logout.emit();
    }
}
