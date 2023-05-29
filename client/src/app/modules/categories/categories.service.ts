import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'; 
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Category } from './interfaces/category.interface';
import { CreateCategory } from './interfaces/create-category.interface';
import { FindCategories } from './interfaces/find-categories.interface';
import { UpdateCategory } from './interfaces/update-category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly url = environment.apiUrl + 'categories/';
    
    constructor(
        private http: HttpClient,
        private notifyService: NotifyService,
    ) { }

    create(category: CreateCategory): Observable<Category> {
        return this.http.post<Category>(this.url, category).pipe(
            map(category => {
                this.notifyService.showSuccess('Category successfully created');
                return category;
            }),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    findAll(options: FindCategories): Observable<{ count: number, rows: Category[] }> {
        return this.http.get<{ count: number, rows: Category[] }>(this.url, {
            params: { ...options }
        }).pipe(
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    update(category: UpdateCategory): Observable<void> {
        return this.http.put<void>(this.url, category).pipe(
            map(() => this.notifyService.showSuccess('Category successfully updated')),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url, {
            params: { id }
        }).pipe(
            map(() => this.notifyService.showSuccess('Category successfully deleted')),
            catchError(error => {
                this.notifyService.showError(error.error.message);
                throw error;
            })
        );
    }
}