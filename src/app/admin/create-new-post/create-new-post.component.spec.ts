import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPostComponent } from './create-new-post.component';

describe('CreateNewPostComponent', () => {
  let component: CreateNewPostComponent;
  let fixture: ComponentFixture<CreateNewPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewPostComponent]
    });
    fixture = TestBed.createComponent(CreateNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
