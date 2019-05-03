import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaVendedoresPage } from './lista-vendedores.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVendedoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaVendedoresPage]
})
export class ListaVendedoresPageModule {}
