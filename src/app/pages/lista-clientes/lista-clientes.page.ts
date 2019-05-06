import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;

  private backbuttonSubscription: Subscription;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private _modalController: ModalController,
    private _navController: NavController,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this._clienteService.listaClientes()
      .subscribe(
        (clientes) => {
          this.clientes = clientes;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );

    
    //outra configuração do back button
    // const event = fromEvent(document, 'backbutton');
    // this.backbuttonSubscription = event.subscribe(async () => {
    //     const modal = await this._modalController.getTop();
    //     if (modal) {
    //         modal.dismiss();
    //     }
    // });

  }

  selecionaCliente(cliente: Cliente) {
    this._modalController.dismiss(cliente);
  }

  voltaOrcamento() {
    // this._navController.back();
      this._modalController.dismiss(this.cliente);
  }

  async novoCliente() {
    const alerta = await this._alertController.create({
      header: 'Novo Cliente',
      inputs:[
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Ex.: Carlos'
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
          text: 'Salvar',
          handler: data => {
            console.log('Confirmar Salvar');
            if(typeof data.nome!=null){
              // this.name = data.nome;
              this._clienteService.cadastraCliente(data.nome);
              console.log('data nome cliente novo: ', data.nome);
            }
          }
        }
      ]
    });
    await alerta.present();
  }

  //outra configuração do back button
  // ngOnDestroy() {
  //   this.backbuttonSubscription.unsubscribe();
  // }

}
