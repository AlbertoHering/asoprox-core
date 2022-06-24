import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Toaster } from 'src/app/models/toaster';
import { ToasterComponent } from 'src/app/modules/shared/toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(
    type: 'danger' | 'info' | 'success' | 'warning',
    title: string,
    message: string
  ) {
    let icon = '';

    switch (type) {
      case 'danger':
        icon = 'highlight_off';
        break;
      case 'info':
        icon = 'info';
        break;
      case 'success':
        icon = 'check_circle_outline';
        break;
      case 'warning':
        icon = 'warning';
        break;

      default:
        break;
    }

    const toasterData: Toaster = {
      type,
      title,
      message,
      cssClass: `alert alert-${type}`,
      icon,
    };

    this._snackBar.openFromComponent(ToasterComponent, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: toasterData,
      panelClass: ['toaster-style'],
    });
  }
}
