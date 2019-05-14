import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Produto } from '../models/produto';

import { ApiService } from './api/api.service';
import { AlertaService } from './alerta/alerta.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  _url: string;

  constructor(
    private _api: ApiService,
    private _http: HttpClient,
    private _alertaService: AlertaService
  ) {
      this._url = this._api.url;
  }

  listaProdutos() {
    return this._http.get<Produto[]>(this._url + 'produto');
  }

  produtosNaoCarregados() {
    this._alertaService.criaAlerta('Falha na conexão', 'Não foi possível carregar a lista de produtos. Tente novamente mais tarde');
  }
}
