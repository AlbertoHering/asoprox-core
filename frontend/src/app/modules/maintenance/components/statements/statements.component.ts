import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { Column } from 'src/app/models/data-table';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Statement, StatementFilters } from 'src/app/models/statement';
import { StatementFormComponent } from './statements-form/statement-form.component';
import { StatementsService } from 'src/app/services/statements/statements.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss'],
})
export class StatementsComponent implements OnInit {
  constructor(
    public statementsService: StatementsService,
    public dialog: MatDialog,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.loadData();
    console.log(this.statements);
  }

  statements?: Array<Statement>;
  filteredStatements?: Array<Statement>;
  columns: Column[] = [
    {
      field: 'full_name',
      title: 'Miembro asociado',
      class: 'statement_fullname'
    },
    {
      field: 'entry_amount_formatted',
      title: 'Aporte',
      class: 'statement_entryamount'
    },
    {
      field: 'company_match_amount_formatted',
      title: 'Aporte patronal',
      class: 'statement_companymatchamount'
    },
    {
      field: 'total_amount_formatted',
      title: 'Aporte total',
      class: 'statement_totalaportes'
    },
    {
      field: 'entry_date',
      title: 'Fecha',
      class: 'statement_entrydate'
    },
  ];

  private formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 2,
  });

  loadData() {
    this.statementsService
      .getAllStatements()
      .pipe(
        take(1),
        tap((getStatementsResult) => {
          if (getStatementsResult.success) {
            const result = getStatementsResult.data;
            if (typeof result !== 'undefined') {
              result.map((r:Statement) => {
                r.entry_date = moment(new Date(r?.entry_date)).locale("es").format('DD [de] MMMM [de] YYYY'),
                r.entry_amount_formatted = this.formatter.format( r.entry_amount ),
                r.company_match_amount_formatted = this.formatter.format( r.company_match_amount ),
                r.total_amount_formatted = this.formatter.format( +r.entry_amount + +r.company_match_amount )
              });
            }
            this.statements = result;
            this.filteredStatements = result;
          }
        })
      )
      .subscribe();
  }

  applyFilters(filters: StatementFilters) {
    this.filteredStatements = this.statements
      ?.filter((statement) =>
        statement.full_name
          .toLocaleLowerCase()
          .includes(filters.full_name.toLocaleLowerCase())
      );
  }

}
