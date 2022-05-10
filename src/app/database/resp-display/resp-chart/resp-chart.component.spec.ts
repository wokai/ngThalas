import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespChartComponent } from './resp-chart.component';

describe('RespChartComponent', () => {
  let component: RespChartComponent;
  let fixture: ComponentFixture<RespChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
