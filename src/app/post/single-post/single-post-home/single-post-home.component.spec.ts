import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostHome } from 'src/app/post/single-post/single-post-home/single-post-home.component';

describe('PostComponent', () => {
  let component: SinglePostHome;
  let fixture: ComponentFixture<SinglePostHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePostHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
