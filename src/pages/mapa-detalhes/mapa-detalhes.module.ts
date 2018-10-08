import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaDetalhesPage } from './mapa-detalhes';

@NgModule({
  declarations: [
    MapaDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaDetalhesPage),
  ],
})
export class MapaDetalhesPageModule {}
