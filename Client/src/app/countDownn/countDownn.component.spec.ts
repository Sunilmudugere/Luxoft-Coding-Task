/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CountDownnComponent } from './countDownn.component';

describe('CountDownnComponent', () => {
  let component: CountDownnComponent;
  let fixture: ComponentFixture<CountDownnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountDownnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDownnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
