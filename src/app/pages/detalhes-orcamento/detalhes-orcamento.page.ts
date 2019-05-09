import { Component } from '@angular/core';
import { Orcamento } from 'src/app/models/orcamento';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-orcamento',
  templateUrl: './detalhes-orcamento.page.html',
  styleUrls: ['./detalhes-orcamento.page.scss'],
})
export class DetalhesOrcamentoPage {

  public orcamento: Orcamento;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {

    this._activatedRoute.queryParams
      .subscribe(params => {
        if (this._router.getCurrentNavigation().extras.state) {
          this.orcamento = this._router.getCurrentNavigation().extras.state.orcamento;
        }
      });
  }

}
