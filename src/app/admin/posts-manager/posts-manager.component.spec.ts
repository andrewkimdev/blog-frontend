import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsManagerComponent } from './posts-manager.component';

describe('PostsManagerComponent', () => {
  let component: PostsManagerComponent;
  let fixture: ComponentFixture<PostsManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsManagerComponent]
    });
    fixture = TestBed.createComponent(PostsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
