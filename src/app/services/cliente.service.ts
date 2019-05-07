import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  _url: string;

  constructor(private _api: ApiService,
    private _http: HttpClient) {
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
}
