import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPlay } from './to-play';

describe('ToPlay', () => {
  let component: ToPlay;
  let fixture: ComponentFixture<ToPlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToPlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToPlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
