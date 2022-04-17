import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespDisplayComponent } from './resp-display.component';

describe('RespDisplayComponent', () => {
  let component: RespDisplayComponent;
  let fixture: ComponentFixture<RespDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
