import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapaDetalhesPage } from '../mapa-detalhes/mapa-detalhes'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) { }
  ionViewDidLoad() { }

  abrirDetalhes() {
    //console.log(page);
    //this.navCtrl.push(FilmesDetalhesPage, { id: filme.id });
    this.navCtrl.push(MapaDetalhesPage);

  }
}