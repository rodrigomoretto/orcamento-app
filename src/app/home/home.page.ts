import { Component, OnInit } from '@angular/core';
import { Orcamento } from '../models/orcamento';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { OrcamentoService } from '../services/orcamento.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private _orcamentoService: OrcamentoService
    ) { }
    
    ngOnInit(): void {
      this._orcamentoService.listaOrcamento()
              .subscribe(
                (orcamentos) => {
                  this.orcamentos = orcamentos;
                  //loading.dismiss();
                },
                (err: HttpErrorResponse) => {
                  console.log(err);

                  //loading.dismiss();

                  // this._alertCtrl.create({
                  //   title: 'Falha na conexao',
                  //   subTitle: 'Nao foi possivel carregar a lista de carros. Tente novamente mais tarde!',
                  //   buttons: [
                  //     { text:'Ok' }
                  //   ]
                  // }).present();
                }
              );
    }
  

}
