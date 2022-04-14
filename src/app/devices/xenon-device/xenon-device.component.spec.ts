import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XenonDeviceComponent } from './xenon-device.component';

describe('XenonDeviceComponent', () => {
  let component: XenonDeviceComponent;
  let fixture: ComponentFixture<XenonDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XenonDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XenonDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
