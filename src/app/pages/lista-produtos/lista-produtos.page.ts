import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {

  produto: Produto = {
    id: 0,
    preco: 0,
    quantidade: 0,
    titulo: ''
  };
  produtos: Array<Produto>;
  quantidade: number;

  constructor(
    private _modalController: ModalController,
    private _produtoService: ProdutoService,
    private _loadingController: LoadingController,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this.atualizaProdutos();
  }

  selecionaProduto(produto: Produto) {
    this._modalController.dismiss(produto);
  }

  voltaOrcamento() {
    this._modalController.dismiss(null);
  }

  async atualizaProdutos() {
    const loading = await this._loadingController.create({
      message: 'Carregando Produtos'
    });
    await loading.present();

    this._produtoService.listaProdutos()
      .subscribe(
        (produtos: Array<Produto>) => {
          this.produtos = produtos;
          console.log(this.produtos);
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          loading.dismiss();
          this._produtoService.produtosNaoCarregados();
        }
      );
  }

  async selecionaQuantidade(produto: Produto) {
    console.log(produto);
    console.log(this.produto);
    const alerta = await this._alertController.create({
      // header: 'Quantidade',
      message: 'Informe a quantidade para ' + produto.titulo + '.',
      inputs: [
        {
          name: 'quantia',
          type: 'number',
          min: 1
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirmar cancelar');
          }
        },
        {
          text: 'Selecionar',
          handler: (data) => {
            let quantiaData = parseFloat(data.quantia);
            console.log(quantiaData);
            if (quantiaData >= 1) {
              console.log('nao nulo: ', quantiaData);
            }
            if (typeof data.quantia != null && data.quantia >= 1) {
              console.log(data);
              console.log(produto);
              produto.quantidade = parseFloat(data.quantia);
              console.log(produto.quantidade);
              this.selecionaProduto(produto);
            }
          }
        }
      ]
    });
    await alerta.present();
  }
}
