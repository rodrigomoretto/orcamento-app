import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { AlertaService } from './alerta/alerta.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  _url: string;

  constructor(private _api: ApiService,
    private _http: HttpClient,
    private _alertaService: AlertaService
  ) {
      this._url = this._api.url;
  }

  listaClientes() {
    return this._http.get<Cliente[]>(this._url + 'cliente');
  }

  cadastraCliente(cliente: string) {
    let clienteNovo = {
      nome: cliente
    };
    return this._http
      .post(this._url + 'cliente', clienteNovo);
  }

  clientesNaoCarregados() {
    this._alertaService.criaAlerta('Falha na conexão', 'Não foi possível carregar os clientes. Tente novamente mais tarde.');
  }

  clienteCadastrado() {
    this._alertaService.criaAlerta('Parabéns', 'Cliente cadastrado com sucesso.');
  }

  clienteNaoCadastrado() {
    this._alertaService.criaAlerta('Erro', 'Falha ao cadastrar o cliente. Tente novamente mais tarde.');
  }
}
