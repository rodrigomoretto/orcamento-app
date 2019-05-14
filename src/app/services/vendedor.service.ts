import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vendedor } from '../models/vendedor';

import { ApiService } from './api/api.service';
import { AlertaService } from './alerta/alerta.service';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  _url: string;

  constructor(
    private _api: ApiService,
    private _http: HttpClient,
    private _alertaService: AlertaService
  ) {
      this._url = this._api.url;
  }

  listaVendedores() {
    return this._http.get<Vendedor[]>(this._url + 'vendedor');
  }

  vendedoresNaoCarregados() {
    this._alertaService.criaAlerta('Falha na conexão', 'Não foi possível carregar a lista de vendedores. Tente novamente mais tarde');
  }
}
