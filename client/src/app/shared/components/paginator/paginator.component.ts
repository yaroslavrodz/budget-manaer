import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { PageEvent } from '../../interfaces/page-event.interface';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
    @Input() pageIndex!: number;
    @Input() pageSize!: number;
    @Input() pageSizeOptions!: number[];
    @Input() length!: number;
    @Input() visiblePagesRange!: number;
    @Output() page = new EventEmitter<PageEvent>();

    visiblePages: number[] = [];

    constructor() { }

    nextPage(): void {
        if (!this._hasNextPage()) {
            return;
        }
        this.setPage(this.pageIndex + 1);
    }

    previousPage(): void {
        if (!this._hasPreviousPage()) {
            return;
        }
        this.setPage(this.pageIndex - 1);
    }

    firstPage(): void {
        if (!this._hasPreviousPage()) {
            return;
        }
        this.setPage(1);
    }

    lastPage(): void {
        if (!this._hasNextPage()) {
            return;
        }
        this.setPage(this._getNumberOfPages());
    }

    changePageSize(pageSize: number) {
        const previousPageSize = this.pageSize;
        this.pageSize = pageSize;

        const startIndex = (this.pageIndex - 1) * previousPageSize;
        this.setPage(Math.floor(startIndex / pageSize) || 1);
    }

    setPage(index: number) {
        this.pageIndex = index;
        this._emitPageEvent();
    }

    private _getNumberOfPages(): number {
        if (!this.pageSize) {
            return 0;
        }
        return Math.ceil(this.length / this.pageSize);
    }

    private _hasPreviousPage(): boolean {
        return this.pageIndex > 1 && this.pageSize != 0;
    }

    private _hasNextPage(): boolean {
        const maxPageIndex = this._getNumberOfPages();
        return this.pageIndex < maxPageIndex && this.pageSize != 0;
    }

    private _emitPageEvent(): void {
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        });
    }

    private _updateVisiblePages(): void {
        if (this.length === 0) {
            this.visiblePages = []
            return;
        }

        const numberOfPages = this._getNumberOfPages();
        let pages = [this.pageIndex];

        let i = 1;
        while (pages.length !== this.visiblePagesRange && i <= this.visiblePagesRange) {
            let pageBefore = this.pageIndex - i;
            if (pageBefore >= 1) {
                pages.unshift(pageBefore);
            }

            let pageAfter = this.pageIndex + i;
            if (pageAfter <= numberOfPages) {
                pages.push(pageAfter);
            }

            i++;
        }

        this.visiblePages = pages;
    }

    ngOnChanges(): void {
        this._updateVisiblePages();
    }
}
