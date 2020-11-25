import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatsComponent } from './ticket-stats.component';

describe('TicketStatsComponent', () => {
  let component: TicketStatsComponent;
  let fixture: ComponentFixture<TicketStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
