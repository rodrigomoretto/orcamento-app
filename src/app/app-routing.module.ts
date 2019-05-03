import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'detalhes-orcamento', loadChildren: './pages/detalhes-orcamento/detalhes-orcamento.module#DetalhesOrcamentoPageModule' },
  { path: 'cadastro-orcamento', loadChildren: './pages/cadastro-orcamento/cadastro-orcamento.module#CadastroOrcamentoPageModule' },
  { path: 'lista-clientes', loadChildren: './pages/lista-clientes/lista-clientes.module#ListaClientesPageModule' },
  { path: 'lista-vendedores', loadChildren: './pages/lista-vendedores/lista-vendedores.module#ListaVendedoresPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
