import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardEmailVerificationComponent } from './idCardEmail-verification.component';

describe('IdCardEmailVerificationComponent', () => {
  let component: IdCardEmailVerificationComponent;
  let fixture: ComponentFixture<IdCardEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardEmailVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
