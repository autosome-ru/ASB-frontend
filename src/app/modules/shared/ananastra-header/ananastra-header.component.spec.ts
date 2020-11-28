import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnanastraHeaderComponent } from './ananastra-header.component';

describe('AnanastraHeaderComponent', () => {
  let component: AnanastraHeaderComponent;
  let fixture: ComponentFixture<AnanastraHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnanastraHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnanastraHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
