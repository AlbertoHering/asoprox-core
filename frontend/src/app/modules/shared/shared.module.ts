import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialogComponent } from './confirmation-dialog/confirm-dialog.component';
import { DataTableComponent } from './data-table/data-table.component';
import { appPolicyDirective } from 'src/app/directives/app.policy/app.policy.directive';
import { PageTitleComponent } from '../maintenance/components/page-title/page-title.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [ConfirmDialogComponent, appPolicyDirective, DataTableComponent, ToasterComponent, PageTitleComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    ReactiveFormsModule,
    SharedRoutingModule,
  ],
  exports: [
    DataTableComponent,
    FormsModule,
    appPolicyDirective,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    ReactiveFormsModule,
    ToasterComponent,
    PageTitleComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
})
export class SharedModule { }
