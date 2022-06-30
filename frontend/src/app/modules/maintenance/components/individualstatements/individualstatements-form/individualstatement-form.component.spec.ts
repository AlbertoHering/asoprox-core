/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndividualStatementFormComponent } from './individualstatement-form.component';

describe('IndividualStatementFormComponent', () => {
  let component: IndividualStatementFormComponent;
  let fixture: ComponentFixture<IndividualStatementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualStatementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualStatementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
