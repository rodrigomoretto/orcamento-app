import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: Cliente[];

  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._clienteService.listaClientes()
      .subscribe(
        (clientes) => {
          this.clientes = clientes;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

}
