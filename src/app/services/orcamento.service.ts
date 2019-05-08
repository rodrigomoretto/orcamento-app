import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Orcamento } from '../models/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  _url: string;

  constructor(private _api: ApiService,
    private _http: HttpClient) {
      this._url = this._api.url;
  }

  listaOrcamento() {
    return this._http.get<Orcamento[]>(this._url + 'orcamento');
  }

  salvaOrcamento(orcamento: Orcamento) {
    return this._http
      .post(this._url + 'orcamento', orcamento);
  }
}
