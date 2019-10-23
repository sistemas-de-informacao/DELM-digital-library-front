import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private _PT_BR = 'pt';
  private _EN_US = 'en';

  getLocale(): string {
    if (navigator.language === 'pt-BR') {
      return this._PT_BR;
    } else {
      return this._EN_US;
    }
  }

}
