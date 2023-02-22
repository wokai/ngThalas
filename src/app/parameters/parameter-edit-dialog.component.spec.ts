import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterEditDialogComponent } from './parameter-edit-dialog.component';

describe('ParameterEditDialogComponent', () => {
  let component: ParameterEditDialogComponent;
  let fixture: ComponentFixture<ParameterEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
