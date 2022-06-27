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
  userForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public usersService: UsersService,
    public toasterService: ToasterService
  ) {
    this.userData = data;
    this.readOnly = data?.read_only || false;
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      full_name: new FormControl(this.userData?.full_name || '', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      email: new FormControl(this.userData?.email || '', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email,
      ]),
      personal_email: new FormControl(this.userData?.personal_email || '', [
        Validators.maxLength(100),
        Validators.email,
      ])
    });

    this.loadData();
  }

  loadData() {

      if (this.readOnly) {
        this.userForm.disable();
      }

  }

  onSubmit() {
    if (!this.userData) {
      this.usersService
        .addUser(this.userForm.value)
        .pipe(
          take(1),
          tap((result) => {
            this.toasterService.openSnackBar(
              result.success ? 'success' : 'danger',
              'Agregar Miembro Asociado',
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
        .updateUser(this.userForm.value, this.userData.id)
        .pipe(
          take(1),
          tap((result) => {
            this.toasterService.openSnackBar(
              result.success ? 'success' : 'danger',
              'Actualizar Miembro Asociado',
              result.message
            );
            if (result.success) {
              this.dialogRef.close(result);
            }
          })
        )
        .subscribe();
    }
  }
}
