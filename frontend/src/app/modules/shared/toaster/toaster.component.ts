import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Toaster } from 'src/app/models/toaster';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Toaster) {}

  onNoClick() {
    this.data.snackBar?.dismiss();
  }
}
