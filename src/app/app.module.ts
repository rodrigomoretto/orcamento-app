import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OrcamentoService } from './services/orcamento.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaClientesPageModule } from './pages/lista-clientes/lista-clientes.module';
import { ListaVendedoresPageModule } from './pages/lista-vendedores/lista-vendedores.module';
import { ListaProdutosPageModule } from './pages/lista-produtos/lista-produtos.module';

import pt from '@angular/common/locales/pt';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ListaClientesPageModule,
    ListaVendedoresPageModule,
    ListaProdutosPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: LOCALE_ID, useValue: 'pt'
    },
    OrcamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
