import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesOrcamentoPage } from './detalhes-orcamento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesOrcamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesOrcamentoPage]
})
export class DetalhesOrcamentoPageModule {}
