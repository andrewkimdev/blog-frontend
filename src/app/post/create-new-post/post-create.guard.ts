import { inject } from '@angular/core';
import { map } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

import { PostEditorService } from '../post-editor/services/post-editor.service';

export const postCreateGuard: CanActivateFn = (route, state) => {
  const postEditorService = inject(PostEditorService);
  const router = inject(Router);

  return postEditorService.createNewPost().pipe(
    map(({ id, createdAt }) => {
      if (id) {
        router.navigate(['posts', id, 'edit'], { queryParams: { 'is-new': true, 'created-at': createdAt }});
        return true;
      }
      return false;
    }),
  );
};
