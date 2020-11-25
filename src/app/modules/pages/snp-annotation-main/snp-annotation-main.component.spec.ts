import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnpAnnotationMainComponent } from './snp-annotation-main.component';

describe('SnpAnnotationMainComponent', () => {
  let component: SnpAnnotationMainComponent;
  let fixture: ComponentFixture<SnpAnnotationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnpAnnotationMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnpAnnotationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
