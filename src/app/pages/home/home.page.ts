import { Component, OnInit } from '@angular/core';
import { Orcamento } from '../../models/orcamento';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { OrcamentoService } from '../../services/orcamento.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public orcamentos: Orcamento[];
  

  constructor(
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _orcamentoService: OrcamentoService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.atualizaOrcamentos();
  }

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

    const loading = await this._loadingCtrl.create({
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
          console.log(err);

          loading.dismiss();

          this.criaAlerta('Falha na conexão', 'Nao foi possivel carregar a lista de orçamentos. Tente novamente mais tarde!');
        }
      );
  }

  async criaAlerta(header: string, message: string) {
    const alerta = await this._alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        { text:   'Ok' }
      ]
    });

    await alerta.present();
  }

}
