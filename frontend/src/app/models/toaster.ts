import { MatSnackBar } from '@angular/material/snack-bar';

export interface Toaster {
  type: 'danger' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  cssClass: string;
  icon: string;
  snackBar?: MatSnackBar;
}
