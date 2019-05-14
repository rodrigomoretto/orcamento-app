import { NavController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { Orcamento } from '../../models/orcamento';

import { OrcamentoService } from '../../services/orcamento.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public orcamentos: Orcamento[];

  constructor(
    public navCtrl: NavController,
    private _loadingController: LoadingController,
    private _orcamentoService: OrcamentoService,
    private _router: Router
    ) { }

  ionViewWillEnter() {
    this.atualizaOrcamentos();
  }

  selecionaOrcamento(orcamento: Orcamento) {

    let navigationExtras: NavigationExtras = {
      state: {
        orcamento: orcamento
      }
    };
    this._router.navigate(['detalhes-orcamento'], navigationExtras);
  }

  async atualizaOrcamentos() {

    const loading = await this._loadingController.create({
      message: 'Carregando Orçamentos'
    });
    await loading.present();

    this._orcamentoService.listaOrcamento()
      .subscribe(
        (orcamentos) => {
          this.orcamentos = orcamentos;
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          loading.dismiss();
          this._orcamentoService.orcamentosNaoCarregados();
        }
      );
  }

}
