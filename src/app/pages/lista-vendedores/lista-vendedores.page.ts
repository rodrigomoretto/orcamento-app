import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController, LoadingController } from '@ionic/angular';

import { Vendedor } from 'src/app/models/vendedor';

import { VendedorService } from 'src/app/services/vendedor.service';

@Component({
  selector: 'app-lista-vendedores',
  templateUrl: './lista-vendedores.page.html',
  styleUrls: ['./lista-vendedores.page.scss'],
})
export class ListaVendedoresPage implements OnInit {

  vendedores: Array<Vendedor>;

  constructor(
    private _vendedorService: VendedorService,
    private _modalController: ModalController,
    private _loadingController: LoadingController
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

  async atualizaVendedores() {
    const loading = await this._loadingController.create({
      message: 'Carregando Vendedores'
    });
    await loading.present();

    this._vendedorService.listaVendedores()
      .subscribe(
        (vendedores: Array<Vendedor>) => {
          this.vendedores = vendedores;
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          loading.dismiss();
          this._vendedorService.vendedoresNaoCarregados();
        }
      );
  }

}
