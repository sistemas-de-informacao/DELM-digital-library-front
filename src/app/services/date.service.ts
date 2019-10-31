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

}
