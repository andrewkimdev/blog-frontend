import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailModalComponent } from './thumbnail-modal.component';

describe('ThumbnailModalComponent', () => {
  let component: ThumbnailModalComponent;
  let fixture: ComponentFixture<ThumbnailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThumbnailModalComponent]
    });
    fixture = TestBed.createComponent(ThumbnailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
