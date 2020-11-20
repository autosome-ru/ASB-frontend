import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SciNotationComponent } from './sci-notation.component';

describe('SciNotationComponent', () => {
  let component: SciNotationComponent;
  let fixture: ComponentFixture<SciNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SciNotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SciNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
