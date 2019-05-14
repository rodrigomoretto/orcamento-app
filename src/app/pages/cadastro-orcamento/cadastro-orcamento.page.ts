import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';

import { ListaClientesPage } from '../lista-clientes/lista-clientes.page';
import { ListaVendedoresPage } from '../lista-vendedores/lista-vendedores.page';
import { ListaProdutosPage } from '../lista-produtos/lista-produtos.page';

import { Cliente } from 'src/app/models/cliente';
import { Vendedor } from 'src/app/models/vendedor';
import { Produto } from 'src/app/models/produto';

import { OrcamentoService } from 'src/app/services/orcamento.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';

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

  quantidade: number = 1;

  constructor(
    private _navController: NavController,
    private _modalController: ModalController,
    private _alertaService: AlertaService,
    private _alertController: AlertController,
    private _orcamentoService: OrcamentoService
  ) { }

  ngOnInit() {
    this.totalNaView();
  }

  cadastroOrcamento() {
    if (this.cliente.id === 0 && this.vendedor.id === 0 && this.produtosTotal === 0) {
      this._alertaService.criaAlerta('Campos Obrigatórios', 'Por favor preencha todos os campos.');
      return;
    }

    if (this.cliente.id === 0) {
      this._alertaService.criaAlerta('Sem cliente', 'Por favor selecione um cliente.');
      return;
    }

    if (this.vendedor.id === 0) {
      this._alertaService.criaAlerta('Sem vendedor', 'Por favor selecione um vendedor.');
      return;
    }

    if (this.produtosTotal === 0 && this.produtos.length === 0) {
      this._alertaService.criaAlerta('Sem produtos', 'Por favor selecione pelo menos um produto.');
      return;
    }


    let orcamento = {
      cliente: this.cliente.id,
      vendedor: this.vendedor.id,
      total: this.produtosTotal,
      produtos: []
    };

    this.produtos.forEach(produto => {
      orcamento.produtos.push({
        id: produto.id,
        valor: produto.preco,
        quantidade: produto.quantidade
      });
    });

    this._orcamentoService.salvaOrcamento(orcamento)
      .subscribe(data => {
        this.cadastroRealizado();
      }, error => {
        this._alertaService.criaAlerta('Erro', 'Falha ao cadastrar o orçamento. Tente novamente mais tarde.');
      });

  }

  async listaClientes() {
    const modal = await this._modalController.create({
      component: ListaClientesPage,
      componentProps: { cliente: this.cliente }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data != null) {
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
        if (data.data != null) {
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
          let count = 0;
          this.produto = data['data'];
          this.produtos.forEach((produto) => {
            if (produto.id === this.produto.id) {
              produto.quantidade += this.produto.quantidade;
              count++;
            }
          });
          if(count === 0){
            this.produtos.push(this.produto);
          }
          this.totalNaView();
        }
      });
    return await modal.present();
  }

  quantidadeProdutoMais(produto: Produto) {
    if (produto.quantidade > 0) {
      produto.quantidade += 1;
      this.totalNaView();
    }
  }

  quantidadeProdutoMenos(produto: Produto) {
    if (produto.quantidade > 1) {
      produto.quantidade -= 1;
      this.totalNaView();
    }
  }

  async removeProduto(indice: number, produto: Produto) {
    const alerta = await this._alertController.create({
      header: 'Aviso',
      message: 'Tem certeza que deseja remover o produto ' + produto.titulo + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.produtos.splice(indice, 1);
            this.totalNaView();
          }
        }
      ]
    });
    await alerta.present();

    this.totalNaView();
  }

  async cadastroRealizado() {
    const alerta = await this._alertController.create({
      header: 'Parabéns',
      message: 'Orçamento cadastrado com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this._navController.navigateRoot('home');
          }
        }
      ]
    });
    await alerta.present();
  }

  totalNaView() {
    let total: number = 0;
    if (this.produtos != null) {
      this.produtos.forEach(produto => {
        total += produto.preco * produto.quantidade;
      }
      );
      this.produtosTotal = total;
    }
  }

}
