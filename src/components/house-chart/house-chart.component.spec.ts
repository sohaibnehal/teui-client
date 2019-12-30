import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseChartComponent } from './house-chart.component';

describe('HouseChartComponent', () => {
  let component: HouseChartComponent;
  let fixture: ComponentFixture<HouseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
