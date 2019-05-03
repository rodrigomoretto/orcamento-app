import { Component, OnInit } from '@angular/core';
import { Vendedor } from 'src/app/models/vendedor';
import { VendedorService } from 'src/app/services/vendedor.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-vendedores',
  templateUrl: './lista-vendedores.page.html',
  styleUrls: ['./lista-vendedores.page.scss'],
})
export class ListaVendedoresPage implements OnInit {

  vendedores: Vendedor[];

  constructor(
    private _vendedorService: VendedorService
  ) { }

  ngOnInit() {
    this._vendedorService.listaVendedores()
      .subscribe(
        (vendedores) => {
          this.vendedores = vendedores;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

}
