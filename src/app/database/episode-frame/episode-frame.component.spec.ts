import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeFrameComponent } from './episode-frame.component';

describe('EpisodeFrameComponent', () => {
  let component: EpisodeFrameComponent;
  let fixture: ComponentFixture<EpisodeFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
