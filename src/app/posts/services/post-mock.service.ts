import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POSTS as posts } from 'src/assets/mock-data/mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostMockService implements InMemoryDbService {

  createDb(): {} | Observable<{}> | Promise<{}> {
    return of({ posts });
  }
}
