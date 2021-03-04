import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardVerificationComponent } from './idCard-verification.component';

describe('IdCardVerificationComponent', () => {
  let component: IdCardVerificationComponent;
  let fixture: ComponentFixture<IdCardVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
