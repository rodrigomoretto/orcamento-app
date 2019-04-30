import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Vendedor } from '../models/vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  _url: string;

  constructor(private _api: ApiService,
    private _http: HttpClient) {
      this._url = this._api.url;
  }

  listaVendedores() {
    return this._http.get<Vendedor[]>(this._url + 'vendedor');
  }
}
