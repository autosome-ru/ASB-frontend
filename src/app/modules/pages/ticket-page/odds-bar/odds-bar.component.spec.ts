import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsBarComponent } from './odds-bar.component';

describe('OddsBarComponent', () => {
  let component: OddsBarComponent;
  let fixture: ComponentFixture<OddsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
