import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { Orcamento } from 'src/app/models/orcamento';
import { HttpErrorResponse } from '@angular/common/http';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Vendedor } from 'src/app/models/vendedor';

@Component({
  selector: 'app-detalhes-orcamento',
  templateUrl: './detalhes-orcamento.page.html',
  styleUrls: ['./detalhes-orcamento.page.scss'],
})
export class DetalhesOrcamentoPage implements OnInit {

  public orcamento: Orcamento;
  public produtos: Produto[];
  public itens: Array<any>;
  public cliente: Cliente;
  public vendedor: Vendedor;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {

    this._activatedRoute.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.orcamento = this._router.getCurrentNavigation().extras.state.orcamento;
        console.log(this.orcamento);
      }
    });
    console.log(this.orcamento);

    // this.carro = this.navParams.get('carroSelecionado');
    // this.orcamentos = this.navParams.get('orcamento');
    // console.log(this.orcamentos)
  }

  ngOnInit() {
    // this._activatedRoute.params.subscribe(params => {
    //   this.orcamentos = params['id'];
    //   console.log(this.orcamentos);
    // });

    // console.log(this._activatedRoute.snapshot.data);
    // console.log(this.orcamentos_id);
  }

}
