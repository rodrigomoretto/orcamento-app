import { Component, OnInit } from '@angular/core';
import { Vendedor } from 'src/app/models/vendedor';
import { VendedorService } from 'src/app/services/vendedor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-vendedores',
  templateUrl: './lista-vendedores.page.html',
  styleUrls: ['./lista-vendedores.page.scss'],
})
export class ListaVendedoresPage implements OnInit {

  vendedores: Vendedor[];
  vendedor: Vendedor

  constructor(
    private _vendedorService: VendedorService,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    this.atualizaVendedores();
  }

  selecionaVendedor(vendedor: Vendedor) {
    this._modalController.dismiss(vendedor);
  }

  voltaOrcamento() {
    this._modalController.dismiss(null);
  }

  atualizaVendedores() {
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
