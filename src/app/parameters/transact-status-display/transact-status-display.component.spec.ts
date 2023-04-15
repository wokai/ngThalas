import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactStatusDisplayComponent } from './transact-status-display.component';

describe('TransactStatusDisplayComponent', () => {
  let component: TransactStatusDisplayComponent;
  let fixture: ComponentFixture<TransactStatusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactStatusDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactStatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
