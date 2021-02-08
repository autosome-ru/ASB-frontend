import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdrSelectComponent } from './fdr-select.component';

describe('FdrSelectComponent', () => {
  let component: FdrSelectComponent;
  let fixture: ComponentFixture<FdrSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdrSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
