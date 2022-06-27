import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';

import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Statement } from 'src/app/models/statement';
import { StatementsService } from 'src/app/services/statements/statements.service';

@Component({
  selector: 'app-statement-form',
  templateUrl: './statement-form.component.html',
  styleUrls: ['./statement-form.component.scss'],
})
export class StatementFormComponent implements OnInit {
  statementData: Statement;

  constructor(
    private dialogRef: MatDialogRef<StatementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Statement,
    public statementsService: StatementsService,
    public toasterService: ToasterService
  ) {
    this.statementData = data;
  }

  ngOnInit() { }

  loadData() { }

}
