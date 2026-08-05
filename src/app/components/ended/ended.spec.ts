import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ended } from './ended';

describe('Ended', () => {
  let component: Ended;
  let fixture: ComponentFixture<Ended>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ended]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ended);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
