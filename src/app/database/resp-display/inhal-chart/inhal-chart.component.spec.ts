import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhalChartComponent } from './inhal-chart.component';

describe('InhalChartComponent', () => {
  let component: InhalChartComponent;
  let fixture: ComponentFixture<InhalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhalChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
