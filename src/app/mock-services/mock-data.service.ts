import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MockCategories } from 'src/assets/mock-data/mock-categories';
import { MockPosts } from 'src/assets/mock-data/mock-posts';
import { MockUsers } from 'src/assets/mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {

  createDb(): {} | Observable<{}> | Promise<{}> {
    return of({
      users: MockUsers,
      posts: MockPosts,
      categories: MockCategories,
    });
  }
}