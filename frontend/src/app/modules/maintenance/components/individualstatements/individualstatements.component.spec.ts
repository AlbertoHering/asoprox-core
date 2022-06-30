/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndividualStatementsComponent } from './individualstatements.component';

describe('IndividualStatementsComponent', () => {
  let component: IndividualStatementsComponent;
  let fixture: ComponentFixture<IndividualStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
