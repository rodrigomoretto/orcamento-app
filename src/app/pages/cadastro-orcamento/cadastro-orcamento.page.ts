import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { ListaClientesPage } from '../lista-clientes/lista-clientes.page';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute } from '@angular/router';
import { Vendedor } from 'src/app/models/vendedor';
import { ListaVendedoresPage } from '../lista-vendedores/lista-vendedores.page';
import { Produto } from 'src/app/models/produto';
import { ListaProdutosPage } from '../lista-produtos/lista-produtos.page';
import { Orcamento } from 'src/app/models/orcamento';
import { forEach } from '@angular/router/src/utils/collection';

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
  };

  produto: Produto;
  produtos: Array<Produto> = [];

  produtosTotal: number = 0;

  orcamento: Orcamento;

  quantidade: number = 1;

  constructor(
    private _navController: NavController,
    private _modalController: ModalController,
    private _activatedRoute: ActivatedRoute,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this.totalNaView();
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
        if(data.data != null){
          this.cliente = data['data'];
        }
    });

    return await modal.present();
  }

  async listaVendedores() {
    const modal = await this._modalController.create({
      component: ListaVendedoresPage,
      componentProps: { vendedor: this.vendedor }
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data.data != null){
          this.vendedor = data['data'];
        }
    });

    return await modal.present();
  }

  async listaProdutos() {
    const modal = await this._modalController.create({
      component: ListaProdutosPage,
      componentProps: { produto: this.produto }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data != null) {
          this.produto = data['data'];
          this.produto.quantidade = 1;
          this.produtos.push(this.produto);
          this.totalNaView();
        }
    });

    return await modal.present();
  }

  quantidadeProdutoMais(produto: Produto) {
    if(produto.quantidade > 0) {
      produto.quantidade += 1;
      this.totalNaView();
    }
  }

  quantidadeProdutoMenos(produto: Produto) {
    if(produto.quantidade > 1) {
      produto.quantidade -= 1;
      this.totalNaView();
    }
  }

  removeProduto(indice: number) {
    this.produtos.splice(indice, 1);
    this.totalNaView();
    console.log(this.produtos);
  }

  totalNaView() {
    let total: number = 0;
    if(this.produtos != null) {
      this.produtos.forEach(
        (produto: Produto) => {
          total += (produto.preco) * (produto.quantidade);
        }
      );
      this.produtosTotal = total;
    }
  }

}
