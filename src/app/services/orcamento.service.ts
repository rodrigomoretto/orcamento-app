import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Orcamento } from '../models/orcamento';
import { AlertaService } from './alerta/alerta.service';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  _url: string;

  constructor(
    private _api: ApiService,
    private _http: HttpClient,
    private _alertaService: AlertaService
  ) {
      this._url = this._api.url;
  }

  listaOrcamento() {
    return this._http.get<Orcamento[]>(this._url + 'orcamento');
  }

  salvaOrcamento(orcamento: Orcamento) {
    return this._http
      .post(this._url + 'orcamento', orcamento);
  }

  orcamentosNaoCarregados() {
    this._alertaService.criaAlerta('Falha na conexão', 'Não foi possível carregar a lista de orçamentos. Tente novamente mais tarde');
  }
}
