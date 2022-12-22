import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashobardComponent } from './dashobard.component';

describe('DashobardComponent', () => {
  let component: DashobardComponent;
  let fixture: ComponentFixture<DashobardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DashobardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashobardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
