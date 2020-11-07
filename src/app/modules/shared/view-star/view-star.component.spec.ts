import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStarComponent } from './view-star.component';

describe('ViewStarComponent', () => {
  let component: ViewStarComponent;
  let fixture: ComponentFixture<ViewStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
