import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { AdminPostService } from 'src/app/admin/post-editor/services/admin-post.service';
import { User, Post } from 'src/app/shared/types';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent implements OnInit {
  private postSubject: BehaviorSubject<Post> = new BehaviorSubject<Post>({ title: '', body: '', tags: [], isDraft: false });
  post$: Observable<Post> = this.postSubject.asObservable();

  markdownData$: Observable<string | null> = this.post$.pipe(
    map((p) => p.body),
  );

  constructor(private adminPostService: AdminPostService) {}

  setDraft(isDraft: boolean) {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], isDraft };
    this.postSubject.next(post);
  }

  onBodyUpdated(body: string) {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], body };
    this.postSubject.next(post);
  }

  onTitleUpdated(title: string): void {
    const post: Post = { ...this.postSubject.value, tags: [...this.postSubject.value.tags], title };
    this.postSubject.next(post);
  }

  onTagsUpdated(tags: string[]): void {
    const post: Post = { ...this.postSubject.value, tags: [...tags] };
    this.postSubject.next(post);
  }

  onSaveClicked(): void {
    const author: User =      {
      "id": 5,
        "name": "Eva",
        "email": "eva@example.com",
        "profileImage": "assets/images/user-profile/user_profile_female_2.jpg",
        "bio": "Remote work specialist and time management guru.",
        "role": "Editor",
        "socialMedia": [
        {
          "platform": "Twitter",
          "url": "https://twitter.com/eva"
        },
        {
          "platform": "LinkedIn",
          "url": "https://linkedin.com/in/eva"
        }
      ]
    };

    const createdAt = Math.floor(Date.now() / 1000);

    this.adminPostService.createOne({...this.postSubject.value, author, createdAt }).pipe(
      take(1),
      tap((res) => console.log(res))
    ).subscribe();
  }

  onCancelClicked(): void {
    console.log('cancel clicked');
  }

  ngOnInit(): void {
  }
}
