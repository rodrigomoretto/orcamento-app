import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController, NavController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;

  constructor(
    private _clienteService: ClienteService,
    private _modalController: ModalController,
    private _alertController: AlertController,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.atualizaClientes();
  }

  selecionaCliente(cliente: Cliente) {
    this._modalController.dismiss(cliente);
  }

  voltaOrcamento() {
      this._modalController.dismiss(null);
  }


  async novoCliente() {
    const alerta = await this._alertController.create({
      header: 'Novo Cliente',
      inputs: [
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
            if(typeof data.nome != null) {
              this._clienteService.cadastraCliente(data.nome)
                .subscribe(data => {
                  this.atualizaClientes();
                }, error => {
                  console.log('Erro ao cadastrar o cliemte', error);
                });
              console.log('data nome cliente novo: ', data.nome);
            }
          }
        }

      ]
    });
    await alerta.present();
  }

  async atualizaClientes() {
    const loading = await this._loadingController.create({
      message: 'Carregando Clientes'
    });
    await loading.present();

    this._clienteService.listaClientes()
      .subscribe(
        data => {
          this.clientes = data;
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          loading.dismiss();
          this._clienteService.clientesNaoCarregados();
        }
      );
  }

}
