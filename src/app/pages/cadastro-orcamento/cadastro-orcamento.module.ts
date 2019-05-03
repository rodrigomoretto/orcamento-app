import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroOrcamentoPage } from './cadastro-orcamento.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroOrcamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroOrcamentoPage]
})
export class CadastroOrcamentoPageModule {}
