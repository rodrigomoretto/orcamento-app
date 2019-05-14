import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(
    private _alertController: AlertController
  ) { }

  async criaAlerta(header: string, message: string) {
    const alerta = await this._alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text:   'Ok'
        }
      ]
    });
    await alerta.present();
  }

}
