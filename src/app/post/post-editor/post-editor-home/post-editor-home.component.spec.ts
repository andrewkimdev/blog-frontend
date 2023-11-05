import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorHomeComponent } from 'src/app/post/post-editor/post-editor-home/post-editor-home.component';

describe('PostEditorComponent', () => {
  let component: PostEditorHomeComponent;
  let fixture: ComponentFixture<PostEditorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostEditorHomeComponent]
    });
    fixture = TestBed.createComponent(PostEditorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
