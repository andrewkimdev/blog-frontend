import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSignInComponent } from './otp-sign-in.component';

describe('OtpSignInComponent', () => {
  let component: OtpSignInComponent;
  let fixture: ComponentFixture<OtpSignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpSignInComponent]
    });
    fixture = TestBed.createComponent(OtpSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
