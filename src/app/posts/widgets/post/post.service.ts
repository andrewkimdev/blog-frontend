import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService implements InMemoryDbService {

  createDb(): {} | Observable<{}> | Promise<{}> {
    return {};
  }


}
