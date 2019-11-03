import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  static getDataAgora(): string {
    const date = new Date().toLocaleDateString('pt-br');
    return date.toString();
  }

  static converterData(data: Date): string {
    const dataConvertida = new Date(data).toLocaleDateString('pt-br');
    return dataConvertida.toString();
  }

  static converterDataComIfen(data: string) {
    const dia = data.substring(0, 2)
    const mes = data.substring(3, 5);
    const ano = data.substring(6, data.length);
    return ano.concat('-').concat(mes).concat('-').concat(dia);
  }

}
