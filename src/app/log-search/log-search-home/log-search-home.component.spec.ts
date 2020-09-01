import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSearchHomeComponent } from './log-search-home.component';

describe('LogSearchHomeComponent', () => {
  let component: LogSearchHomeComponent;
  let fixture: ComponentFixture<LogSearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSearchHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
