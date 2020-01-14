import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTestsComponent } from './section-tests.component';

describe('SectionTestsComponent', () => {
  let component: SectionTestsComponent;
  let fixture: ComponentFixture<SectionTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
