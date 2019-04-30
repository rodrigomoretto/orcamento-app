import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  private _url: string = 'https://mobile-orcamento.herokuapp.com/api/';

  get url() {
    return this._url;
  }

  public request(metodo, data = null, endpoint){
  }
}
