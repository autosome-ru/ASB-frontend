import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBarplotComponent } from './ticket-barplot.component';

describe('TicketBarplotComponent', () => {
  let component: TicketBarplotComponent;
  let fixture: ComponentFixture<TicketBarplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBarplotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBarplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
