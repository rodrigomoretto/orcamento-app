import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {

  // produtos: Produto[];
  produto: Produto;
  produtos: Array<Produto>;

  constructor(
    private _modalController: ModalController,
    private _produtoService: ProdutoService,
    private _loadingController: LoadingController
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
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          loading.dismiss();
          this._produtoService.produtosNaoCarregados();
        }
      );
  }
}
