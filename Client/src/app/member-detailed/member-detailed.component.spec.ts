/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemberDetailedComponent } from './member-detailed.component';

describe('MemberDetailedComponent', () => {
  let component: MemberDetailedComponent;
  let fixture: ComponentFixture<MemberDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
