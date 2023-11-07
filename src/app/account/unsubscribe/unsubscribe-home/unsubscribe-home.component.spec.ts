import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeHomeComponent } from './unsubscribe-home.component';

describe('UnsubscribeHomeComponent', () => {
  let component: UnsubscribeHomeComponent;
  let fixture: ComponentFixture<UnsubscribeHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsubscribeHomeComponent]
    });
    fixture = TestBed.createComponent(UnsubscribeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
