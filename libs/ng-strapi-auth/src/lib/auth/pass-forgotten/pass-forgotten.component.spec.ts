import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassForgottenComponent } from './pass-forgotten.component';

describe('PassForgottenComponent', () => {
  let component: PassForgottenComponent;
  let fixture: ComponentFixture<PassForgottenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassForgottenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassForgottenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
