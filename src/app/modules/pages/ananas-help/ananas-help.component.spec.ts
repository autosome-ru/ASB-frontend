import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnanasHelpComponent } from './ananas-help.component';

describe('AnanasHelpComponent', () => {
  let component: AnanasHelpComponent;
  let fixture: ComponentFixture<AnanasHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnanasHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnanasHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
