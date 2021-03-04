import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetUserAccountComponent } from './reset-account.component';

describe('ResetUserAccountComponent', () => {
  let component: ResetUserAccountComponent;
  let fixture: ComponentFixture<ResetUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetUserAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
