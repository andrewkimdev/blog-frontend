import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService implements InMemoryDbService {

  createDb(): {} | Observable<{}> | Promise<{}> {
    const posts = [
      { id: 1, publish: true, title: 'First Post', markdown: 'Content of the first post' },
      { id: 2, publish: true, title: 'Second Post', markdown: 'Content of the second post' },
    ]
    return { posts };
  }
}
