/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndividualStatementsActionsComponent } from './individualstatements-actions.component';

describe('IndividualStatementsActionsComponent', () => {
  let component: IndividualStatementsActionsComponent;
  let fixture: ComponentFixture<IndividualStatementsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualStatementsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualStatementsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
