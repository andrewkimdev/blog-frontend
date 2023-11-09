import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Category } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/categories`);
  }

  addCategory(newCategoryName: string): Observable<Category> {
    return this.http.post<Category>(`${ environment.baseUrl }/categories`, { newCategoryName });
  }

  removeCategory(category: string): void {
    // 1. Check if given category exists. (Of course it does but to make the code robust.)
    // 2. Being optimistic, apply the change to this.categoriesSubject.
    // 3. Send the change to the server
    // 4. Refresh the list
  }

  renameCategory(category: string, newName: string): void {
    // 1. Check if given category exists.
    // 2. Being optimistic, apply the change to this.categoriesSubject.
    // 3. Send the change to the server - this should be
    // 4. Refresh the list
  }
}
