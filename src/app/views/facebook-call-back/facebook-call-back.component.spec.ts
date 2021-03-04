import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookCallBackComponent } from './facebook-call-back.component';

describe('FacebookCallBackComponent', () => {
  let component: FacebookCallBackComponent;
  let fixture: ComponentFixture<FacebookCallBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookCallBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookCallBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
