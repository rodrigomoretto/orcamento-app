import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { ListaClientesPage } from '../lista-clientes/lista-clientes.page';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute } from '@angular/router';
import { Vendedor } from 'src/app/models/vendedor';
import { ListaVendedoresPage } from '../lista-vendedores/lista-vendedores.page';

@Component({
  selector: 'app-cadastro-orcamento',
  templateUrl: './cadastro-orcamento.page.html',
  styleUrls: ['./cadastro-orcamento.page.scss'],
})
export class CadastroOrcamentoPage implements OnInit {

  cliente: Cliente = {
    id: 0,
    nome: 'Cliente'
  };
  vendedor: Vendedor = {
    id: 0,
    nome: 'Vendedor'
  }

  constructor(
    private _navController: NavController,
    private _modalController: ModalController,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.cliente);
    console.log(this.vendedor);
  }

  cadastroOrcamento() {

  }

  async listaClientes() {
    const modal = await this._modalController.create({
      component: ListaClientesPage,
      componentProps: { cliente: this.cliente }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.cliente= data['data'];
        console.log('data cliente: ', data);
        console.log('cliente no dididismiss: ', this.cliente);
    });
    console.log('cliente fora', this.cliente);

    return await modal.present();
  }

  async listaVendedores() {
    const modal = await this._modalController.create({
      component: ListaVendedoresPage,
      componentProps: { vendedor: this.vendedor }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.vendedor= data['data'];
        console.log('data vendedor: ', data);
        console.log( 'vendedor no diddismiss: ', this.vendedor);
    });
    console.log('vendedor fora: ', this.vendedor);

    return await modal.present();
  }

}
