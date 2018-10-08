import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapaDetalhesPage } from '../mapa-detalhes/mapa-detalhes'
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  startPosition:any;
  directionsDisplay:any;
  constructor(public navCtrl: NavController,private geolocation: Geolocation) { }
  ionViewDidLoad() { 
    this.getMapByGeolocation();
  }

  abrirDetalhes() {
    //console.log(page);
    //this.navCtrl.push(FilmesDetalhesPage, { id: filme.id });
    this.navCtrl.push(MapaDetalhesPage);
  }
  getMapByGeolocation() {

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 18,
          center: this.startPosition,
          disableDefaultUI: true,
          mapTypeId: 'roadmap'
        }

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.directionsDisplay.setMap(map);

        const marker = new google.maps.Marker({
          position: this.startPosition,
          map: map
        });
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
    }
}