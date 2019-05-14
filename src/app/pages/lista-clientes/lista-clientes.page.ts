import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

import { Cliente } from 'src/app/models/cliente';

import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage{

  clientes: Array<Cliente>;

  constructor(
    private _clienteService: ClienteService,
    private _modalController: ModalController,
    private _alertController: AlertController,
    private _loadingController: LoadingController
  ) { }

  ionViewWillEnter() {
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
          role: 'cancel'
        },

        {
          text: 'Salvar',
          handler: data => {
            if (typeof data.nome != null) {
              this._clienteService.cadastraCliente(data.nome)
                .subscribe(data => {
                  this.atualizaClientes();
                }, error => {
                  this._clienteService.clienteNaoCadastrado();
                  console.log('Erro ao cadastrar o cliemte', error);
                });
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
        (clientes: Array<Cliente>) => {
          this.clientes = clientes;
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
