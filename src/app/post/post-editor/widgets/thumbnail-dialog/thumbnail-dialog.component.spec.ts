import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailDialogComponent } from './thumbnail-dialog.component';

describe('ThumbnailDialogComponent', () => {
  let component: ThumbnailDialogComponent;
  let fixture: ComponentFixture<ThumbnailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThumbnailDialogComponent]
    });
    fixture = TestBed.createComponent(ThumbnailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
