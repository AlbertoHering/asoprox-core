import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from 'src/app/modules/shared/confirmation-dialog/confirm-dialog.component';
import { Column } from 'src/app/models/data-table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() dataList: any[] = [];
  @Input() columns: Array<Column> = [];
  @Input() class: string = '';

  @Output() viewEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() updateAltEvent = new EventEmitter<any>();
  @Output() updateAlt2Event = new EventEmitter<any>();
  @Output() updateAlt3Event = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  displayedColumns: string[] = ['position'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.columns.forEach((c) => this.displayedColumns.push(c.field));
    this.dataSource = new MatTableDataSource<any[]>(
      this.dataList
    );
    this.dataSource = new MatTableDataSource<any[]>(this.dataList);

    const splash = document.getElementById('splash') as HTMLImageElement | null;
    if (null!==splash) {
      splash.setAttribute("style", "transition: visibility 0s, opacity 0.5s linear;opacity:0");
    }
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<any[]>(
      changes['dataList'].currentValue
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  switchAction(action_id: string, element: any){

    switch( action_id ) {
      case 'view': {
        return this.viewEvent.emit(element);
      }
      case 'update': {
        return this.updateEvent.emit(element);
      }
      case 'update': {
        return this.updateEvent.emit(element);
      }
      case 'updateAlt': {
        return this.updateAltEvent.emit(element);
      }
      case 'updateAlt2': {
        return this.updateAlt2Event.emit(element);
      }
      case 'updateAlt3': {
        return this.updateAlt3Event.emit(element);
      }
      case 'delete': {

        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Eliminación de registro',
            message: '¿Está seguro que quiere eliminar el registro seleccionado?'
          }
        });
        confirmDialog.afterClosed().subscribe(result => {
          if (result === true) {
            return this.deleteEvent.emit(element);
          }
          return false;
        });

      }
    }

  }


}
