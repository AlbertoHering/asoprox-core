import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor() { }

  formatMoney(n: number): any {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 2,
    }).format(n);
  }

  formatDate(n: string): any {
    return moment(new Date(n)).locale("es").format('DD[ ]MMM[ ]YYYY').toUpperCase()
  }


}
