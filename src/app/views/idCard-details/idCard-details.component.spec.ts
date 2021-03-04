import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardDetailComponent } from './idCard-details.component';

describe('IdCardDetailComponent', () => {
  let component: IdCardDetailComponent;
  let fixture: ComponentFixture<IdCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
