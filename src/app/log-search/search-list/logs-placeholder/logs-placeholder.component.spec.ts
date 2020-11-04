import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsPlaceholderComponent } from './logs-placeholder.component';

describe('LogsPlaceholderComponent', () => {
  let component: LogsPlaceholderComponent;
  let fixture: ComponentFixture<LogsPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
