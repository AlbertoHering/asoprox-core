import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';

import { APIResponse } from 'src/app/models/api-response';
import { Column } from 'src/app/models/data-table';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from './individualstatements-form/individualstatement-form.component';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { UtilService } from 'src/app/services/util/util.service';
import { User, UserFilters } from 'src/app/models/user';

@Component({
  selector: 'app-individualstatements',
  templateUrl: './individualstatements.component.html',
  styleUrls: ['./individualstatements.component.scss'],
})
export class IndividualStatementsComponent implements OnInit {
  constructor(
    public individualstatementsService: IndividualStatementsService, 
    public dialog: MatDialog,
    private toaster: ToasterService,
    private utils: UtilService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  filteredUsers?: IndividualStatementFilters[];
  individualstatements?: Array<IndividualStatement>;
  columns: Column[] = [
    {
      field: 'entry_date',
      title: 'Fecha de entrada',
      class: 'individualstatement_companymatchamount'
    },
    {
      field: 'entry_amount_formatted',
      title: 'Aporte',
      class: 'individualstatement_entryamount'
    },
    {
      field: 'company_match_amount_formatted',
      title: 'Aporte de empresa',
      class: 'individualstatement_companymatchamount'
    },
    {
      field: 'total_amount_formatted',
      title: 'Aporte total',
      class: 'individualstatement_totalamount'
    },
    {
      field: 'actions',
      title: 'Actions',
      class: 'individualstatement_actions',
      actions: [
        {
          id: 'update',
          icon: {
            name: 'edit',
          },
          label: 'Edit IndividualStatement',
          openDialog: 'dialog',
          policies: ["public"]
        },
        {
          id: 'delete',
          icon: {
            name: 'delete',
          },
          label: 'Delete IndividualStatement',
          policies: ["public"]
        },
      ],
    },
  ];

  loadData() { }

  applyFilters(filters: IndividualStatementFilters) {
    if (typeof filters.member_id !== 'undefined') {
      this.individualstatementsService
      .getIndividualStatement(filters.member_id)
      .pipe(
        take(1),
        tap((getIndividualStatementsResult) => {
          if (getIndividualStatementsResult.success) {
            const result = getIndividualStatementsResult.data;
            if (typeof result !== 'undefined') {
              result.map((r:IndividualStatement) => {
                r.entry_date = this.utils.formatDate(r.entry_date),
                r.entry_amount_formatted = this.utils.formatMoney( r.entry_amount ),
                r.company_match_amount_formatted = this.utils.formatMoney( r.company_match_amount ),
                r.total_amount_formatted = this.utils.formatMoney( +r.entry_amount + +r.company_match_amount )
              });
            }
            this.individualstatements = result;
          }
        })
      )
      .subscribe();
    }
  }

  updateIndividualStatement(individualstatement: IndividualStatement) {
    const dialogRef = this.dialog.open(IndividualStatementFormComponent, {
      data: individualstatement,
      autoFocus: false
    });

    dialogRef
      .afterClosed()
      .subscribe((result: APIResponse<IndividualStatement>) => this.loadData());
  }

  deleteIndividualStatement(data: IndividualStatement) {
    this.individualstatementsService
      .deleteIndividualStatement(data.statement_id)
      .pipe(
        take(1),
        tap((deleteIndividualStatementResult) => {
          this.toaster.openSnackBar(
            deleteIndividualStatementResult.success ? 'success' : 'danger',
            'Delete IndividualStatement',
            deleteIndividualStatementResult.message
          );
          if (deleteIndividualStatementResult.success) {
            this.loadData();
          }
        })
      )
      .subscribe();
  }

  createIndividualStatement(individualstatement: IndividualStatement) {
    if (individualstatement) {
      this.loadData();
    }
  }

}
