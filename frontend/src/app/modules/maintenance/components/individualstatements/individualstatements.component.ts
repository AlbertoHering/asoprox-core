import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { Column } from 'src/app/models/data-table';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from './individualstatements-form/individualstatement-form.component';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';

@Component({
  selector: 'app-individualstatements',
  templateUrl: './individualstatements.component.html',
  styleUrls: ['./individualstatements.component.scss'],
})
export class IndividualStatementsComponent implements OnInit {
  constructor(
    public individualstatementsService: IndividualStatementsService,
    public dialog: MatDialog,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.loadData();
    console.log(this.individualstatements);
  }

  individualstatements?: Array<IndividualStatement>;
  filteredIndividualStatements?: Array<IndividualStatement>;
  columns: Column[] = [
    {
      field: 'full_name',
      title: 'Miembro asociado',
      class: 'individualstatement_fullname'
    },
    {
      field: 'entry_amount_formatted',
      title: 'Aporte',
      class: 'individualstatement_entryamount'
    },
    {
      field: 'company_match_amount_formatted',
      title: 'Aporte patronal',
      class: 'individualstatement_companymatchamount'
    },
    {
      field: 'total_amount_formatted',
      title: 'Total aportes',
      class: 'individualstatement_totalaportes'
    },
    {
      field: 'entry_date',
      title: 'Fecha',
      class: 'individualstatement_entrydate'
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
          label: 'Editar registro',
          openDialog: 'dialog',
          policies: ["public"]
        },
        {
          id: 'delete',
          icon: {
            name: 'delete',
          },
          label: 'Eliminar registro',
          policies: ["public"]
        },
      ],
    },
  ];

  private formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 2,
  });

  loadData() {
    this.individualstatementsService
      .getAllIndividualStatements()
      .pipe(
        take(1),
        tap((getIndividualStatementsResult) => {
          if (getIndividualStatementsResult.success) {
            const result = getIndividualStatementsResult.data;
            if (typeof result !== 'undefined') {
              result.map((r:IndividualStatement) => {
                r.entry_date = moment(new Date(r?.entry_date)).locale("es").format('DD [de] MMMM [de] YYYY'),
                r.entry_amount_formatted = this.formatter.format( r.entry_amount ),
                r.company_match_amount_formatted = this.formatter.format( r.company_match_amount ),
                r.total_amount_formatted = this.formatter.format( +r.entry_amount + +r.company_match_amount )
              });
            }
            this.individualstatements = result;
            this.filteredIndividualStatements = result;
          }
        })
      )
      .subscribe();
  }

  deleteIndividualStatement(data: IndividualStatement) {
    this.individualstatementsService
      .deleteIndividualStatement(+data.member_id)
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

  viewIndividualStatement(individualstatement: IndividualStatement) {
    const dialogRef = this.dialog.open(IndividualStatementFormComponent, {
      data: {read_only: true, ...individualstatement},
    });
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  updateIndividualStatement(individualstatement: IndividualStatement) {
    const dialogRef = this.dialog.open(IndividualStatementFormComponent, {
      data: individualstatement,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  applyFilters(filters: IndividualStatementFilters) {
    this.filteredIndividualStatements = this.individualstatements
      ?.filter((individualstatement) =>
        individualstatement.full_name
          .toLocaleLowerCase()
          .includes(filters.full_name.toLocaleLowerCase())
      );
  }

  createIndividualStatement(individualstatement: IndividualStatement) {
    if (individualstatement) {
      this.loadData();
    }
  }
}
