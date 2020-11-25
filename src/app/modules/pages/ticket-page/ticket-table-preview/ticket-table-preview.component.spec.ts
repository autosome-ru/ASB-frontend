import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTablePreviewComponent } from './ticket-table-preview.component';

describe('TicketTablePreviewComponent', () => {
  let component: TicketTablePreviewComponent;
  let fixture: ComponentFixture<TicketTablePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTablePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTablePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
