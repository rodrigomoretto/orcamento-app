import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  _url: string;

  constructor(private _api: ApiService,
    private _http: HttpClient) {
      this._url = this._api.url;
  }

  listaProdutos() {
    return this._http.get<Produto[]>(this._url + 'produto');
  }
}
