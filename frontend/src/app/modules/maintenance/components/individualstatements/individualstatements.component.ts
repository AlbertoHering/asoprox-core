import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { APIResponse } from 'src/app/models/api-response';
import { Column } from 'src/app/models/data-table';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from './individualstatements-form/individualstatement-form.component';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-individualstatements',
  templateUrl: './individualstatements.component.html',
  styleUrls: ['./individualstatements.component.scss'],
})
export class IndividualStatementsComponent implements OnInit {

  title: string = 'Estado de cuenta individual';

  constructor(
    public individualstatementsService: IndividualStatementsService, 
    public dialog: MatDialog,
    private toaster: ToasterService,
    private utils: UtilService
  ) { }

  ngOnInit() {

    const splash = document.getElementById('splash') as HTMLImageElement | null;
    splash!.setAttribute("style", "display:none;opacity:0");

    this.loadData(0);
  }

  member_id: number = 0;
  summary: IndividualStatement[] = [];
  displaySummary: Boolean = false;
  filteredUsers?: IndividualStatementFilters[];
  individualstatements?: Array<IndividualStatement>;
  columns: Column[] = [
    {
      field: 'entry_date',
      title: 'Fecha de entrada',
      class: 'individualstatement_entrydate'
    },
    {
      field: 'entry_amount_formatted',
      title: 'Aporte individual',
      class: 'individualstatement_entryamount'
    },
    {
      field: 'company_match_amount_formatted',
      title: 'Aporte patronal',
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
          policies: ["admin"]
        },
        {
          id: 'delete',
          icon: {
            name: 'delete_forever',
          },
          label: 'Delete IndividualStatement',
          policies: ["admin"]
        },
      ],
    },
  ];

  loadData(member_id:number) {
    if (member_id>0) {
      this.applyFilters({
        member_id: member_id
      });
    }
  }

  applyFilters(filters: IndividualStatementFilters) {

    const splash = document.getElementById('splash') as HTMLImageElement | null;
    splash!.setAttribute("style", "display:block;opacity:1;");

    if (typeof filters.member_id !== 'undefined') {

      const member_id = document.getElementById('member_id') as HTMLDivElement;
      member_id!.setAttribute('data-value', this.member_id.toString());

      if (filters.member_id!==0) {
        this.displaySummary = true;

      this.member_id = filters.member_id;
      member_id!.setAttribute('data-value', this.member_id.toString());

      this.individualstatementsService
      .getIndividualStatement(this.member_id, 0)
      .pipe(
        take(1),
        tap((getIndividualStatementsResult) => {
          if (getIndividualStatementsResult.success) {
            const result = getIndividualStatementsResult.data;
            if (result?.length===0 && null!==splash) {
                splash.setAttribute("style", "transition: visibility 0s, opacity 0.5s linear;opacity:0");
            }
            if (typeof result !== 'undefined') {
              result.map((r:IndividualStatement) => {
                r.entry_date = this.utils.formatDate(r.entry_date),
                r.entry_amount_formatted = this.utils.formatMoney( r.entry_amount ),
                r.company_match_amount_formatted = this.utils.formatMoney( r.company_match_amount ),
                r.total_amount_formatted = this.utils.formatMoney( +r.entry_amount + +r.company_match_amount )
              });
            }
            this.individualstatements = result;

            this.individualstatementsService
              .getIndividualStatement(this.member_id, 1)
              .pipe(
                take(1),
                tap((getIndividualSummaryResult) => {
                  if (getIndividualSummaryResult.success && typeof getIndividualSummaryResult?.data !== 'undefined') {
                    const result = getIndividualSummaryResult.data;
                    result.map((r:IndividualStatement) => {
                      r.entry_date = this.utils.formatDate(r.entry_date),
                      r.entry_amount_formatted = this.utils.formatMoney( r.entry_amount ),
                      r.company_match_amount_formatted = this.utils.formatMoney( r.company_match_amount ),
                      r.total_amount_formatted = this.utils.formatMoney( +r.entry_amount + +r.company_match_amount )
                    });
                    this.summary = result;
                }})).subscribe((d:any) => {
                  splash!.setAttribute("style", "transition: visibility 0s, opacity 0.5s linear;opacity:0");
                });
          }
        })
      )
      .subscribe();
      } else {
        this.displaySummary = false;
      }
    }
  }

  updateIndividualStatement(individualstatement: IndividualStatement) {

    const limit = moment().subtract(3, 'month').format('MM-DD-YYYY');
    if (!moment(new Date(limit)).isSameOrBefore(moment(new Date(individualstatement.entry_date)))) {
      this.toaster.openSnackBar(
        'danger',
        'Editar Registro',
        'La fecha del registro tiene más de tres meses y no puede ser editada.'
      );
      return;
    }

    this.member_id = individualstatement.member_id;

    const dialogRef = this.dialog.open(IndividualStatementFormComponent, {
      data: individualstatement,
      autoFocus: false
    });

    dialogRef
      .afterClosed()
      .subscribe((result: APIResponse<IndividualStatement>) => this.loadData(individualstatement.member_id));
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
            this.loadData(this.member_id);
          }
        })
      )
      .subscribe();
  }

  createIndividualStatement(individualstatement: IndividualStatement) {
    if (individualstatement) {
      this.loadData(this.member_id);
    }
  }

}
