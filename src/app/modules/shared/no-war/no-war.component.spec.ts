import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoWarComponent } from './no-war.component';

describe('NoWarComponent', () => {
  let component: NoWarComponent;
  let fixture: ComponentFixture<NoWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoWarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
