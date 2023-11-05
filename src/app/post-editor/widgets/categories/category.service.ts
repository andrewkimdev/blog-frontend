import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Category } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([{ name: 'Default from CategoryService'}]);
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.http.get<Category[]>(`${ environment.baseUrl }/categories`).pipe(
      take(1),
      filter((data) => !!data && data.length > 0),
      map((data) => data.length > 0 ? data : [{ name: 'blank' }]),
      map((data) => data.sort((a, b) => a.name.localeCompare(b.name))),
      tap((categories) => this.categoriesSubject.next(categories)),
    ).subscribe();
  }

  addCategory(newCategoryName: string): void {
    // 1. Check for duplicate entry
    if (this.categoriesSubject.value.find((c) => c.name === newCategoryName)) {
      return;
    }

    const newCategory = { name: newCategoryName };

    // 2. Being optimistic, apply the change to this.categoriesSubject.
    this.categoriesSubject.value.push(newCategory);

    // 3. Send the change to the server
    this.http.post<any>(`${ environment.baseUrl }/categories`, newCategory).pipe(
      take(1),
      tap((res) => console.log(res)),
    // 4. Refresh the list
      tap(() => this.refreshList()),
    ).subscribe();
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
