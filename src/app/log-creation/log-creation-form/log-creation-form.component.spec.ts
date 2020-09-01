import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCreationFormComponent } from './log-creation-form.component';

describe('LogCreationFormComponent', () => {
  let component: LogCreationFormComponent;
  let fixture: ComponentFixture<LogCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
