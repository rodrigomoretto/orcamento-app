import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private _produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this._produtoService.listaProdutos()
      .subscribe(
        (produtos: Array<Produto>) => {
          this.produtos = produtos;
          console.log(this.produtos);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  selecionaProduto(produto: Produto) {
    this._modalController.dismiss(produto);
  }

  voltaOrcamento() {
    console.log('produto no modal: ', this.produto);
    if(this.produto != null) {
      console.log('entrou no if, produto no if: ', this.produto);
      this._modalController.dismiss(this.produto);
    }
    this._modalController.dismiss(null);
  }

}
