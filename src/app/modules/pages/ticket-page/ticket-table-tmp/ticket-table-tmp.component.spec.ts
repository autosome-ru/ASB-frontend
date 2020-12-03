import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableTmpComponent } from './ticket-table-tmp.component';

describe('TicketTableTmpComponent', () => {
  let component: TicketTableTmpComponent;
  let fixture: ComponentFixture<TicketTableTmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTableTmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTableTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
