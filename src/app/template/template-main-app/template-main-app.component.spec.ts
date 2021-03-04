import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMainAppComponent } from './template-main-app.component';

describe('TemplateMainAppComponent', () => {
  let component: TemplateMainAppComponent;
  let fixture: ComponentFixture<TemplateMainAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateMainAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMainAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
