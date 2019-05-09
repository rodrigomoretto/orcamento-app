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

  orcamento: Orcamento = {
    cliente: 0,
    vendedor: 0,
    total: 0,
    produtos: []
  };

  quantidade: number = 1;

  constructor(
    private _navController: NavController,
    private _modalController: ModalController,
    private _activatedRoute: ActivatedRoute,
    private _alertaService: AlertaService,
    private _alertController: AlertController,
    private _orcamentoService: OrcamentoService
  ) { }

  ngOnInit() {
    this.totalNaView();
  }

  cadastroOrcamento() {

    if (this.cliente.id === 0) {
      // this.mensageiro('Sem cliente', 'Selecione um cliente.');
      this._alertaService.criaAlerta('Sem cliente', 'Selecione um cliente.');
    } else if (this.vendedor.id === 0) {
      // this.mensageiro('Sem vendedor', 'Selecione um vendedor.');
      this._alertaService.criaAlerta('Sem vendedor', 'Selecione um vendedor.');
    } else if (this.produtosTotal === 0) {
      // this.mensageiro('Sem produtos', 'Selecione pelo menos um produto.');
      this._alertaService.criaAlerta('Sem produtos', 'Selecione pelo menos um produto.');
    }

    if (
      this.cliente.id !== 0 &&
      this.vendedor.id !== 0 &&
      this.produtosTotal !== 0 &&
      this.produtos !== null
    ) {
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

      console.log(orcamento);

      this._orcamentoService.salvaOrcamento(orcamento)
      .subscribe(data => {
        console.log(data);
        console.log('Orcamento cadastrado');
        // this.mensageiro('Parabéns', 'Orçamento cadastrado com sucesso.');
        this._alertaService.criaAlerta('Parabéns', 'Orçamento cadastrado com sucesso.');
        this._navController.navigateRoot('home');
      }, error => {
        // this.mensageiro('Erro', 'Falha ao cadastrar o orçamento. Tente novamente mais tarde.');
        this._alertaService.criaAlerta('Erro', 'Falha ao cadastrar o orçamento. Tente novamente mais tarde.');
        console.log('Erro ao cadastrar o orçamento', error);
      });
    }

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
          this.produto = data['data'];
          this.produto.quantidade = 1;
          this.produtos.push(this.produto);
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

  // async mensageiro(header: string, message: string) {
  //   const alerta = await this._alertController.create({
  //     header: header,
  //     message: message,
  //     buttons: [
  //       {
  //         text: 'Ok'
  //       },
  //     ]
  //   });
  //   await alerta.present();
  // }

  async removeProduto(indice: number, produto: Produto) {
    console.log(produto);
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
            console.log(indice);
            this.produtos.splice(indice, 1);
            this.totalNaView();
          }
        }
      ]
    });
    await alerta.present();

    this.totalNaView();
    console.log(this.produtos);
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
