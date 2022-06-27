import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';

import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userData: User;
  readOnly: Boolean = false;
  userEdit: Boolean = false
  userForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public usersService: UsersService,
    public toasterService: ToasterService
  ) {
    this.userData = data;
    this.readOnly = data?.read_only || false;
    this.userEdit = data?.user_edit || false;
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      full_name: new FormControl(this.userData?.full_name || '', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      email: new FormControl({
          value: this.userData?.email || '',
          disabled: this.userEdit
        }, [
        Validators.required,
        Validators.maxLength(200),
        Validators.email,
      ]),
      personal_email: new FormControl(this.userData?.personal_email || '', [
        Validators.maxLength(200),
        Validators.email,
      ]),
      id: new FormControl(this.userData?.id || '', [
        Validators.required,
      ]),
      initial_date: new FormControl({
        value: this.userData?.initial_date || '',
        disabled: this.userEdit
      }, [
        Validators.required,
      ]),
      account_access: new FormControl({
        value: this.userData?.account_access || '',
        disabled: this.userEdit
      })
    });

    this.loadData();
  }

  loadData() {

    if (this.readOnly) {
        this.userForm.disable();
      }

  }

  onSubmit() {

    if (this.userEdit) {
      this.userForm.value.email = this.userData?.email;
      this.userForm.value.initial_date = this.userData?.initial_date;
      this.userForm.value.account_access = this.userData?.account_access;
    }

    if (!this.userData) {
      this.usersService
        .addUser(this.userForm.value)
        .pipe(
          take(1),
          tap((result: { success: boolean; message: string; }) => {
            this.toasterService.openSnackBar(
              result.success ? 'success' : 'danger',
              'Crear Miembro Asociado',
              result.message
            );
            if (result.success) {
              this.dialogRef.close(result);
            }
          })
        )
        .subscribe();
    } else {
      this.usersService
        .updateUser(this.userForm.value, this.userData.member_id)
        .pipe(
          take(1),
          tap((result: { success: boolean; message: string; }) => {
            this.toasterService.openSnackBar(
              result.success ? 'success' : 'danger',
              'Actualizar Miembro Asociado',
              result.message
            );
            if (result.success) {
              this.dialogRef.close(result);
              if (this.userEdit) {
                
              }
            }
          })
        )
        .subscribe();
    }
  }
}
