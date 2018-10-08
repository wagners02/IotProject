import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
  selector: 'page-mapa-detalhes',
  templateUrl: 'mapa-detalhes.html',
})
export class MapaDetalhesPage {
  enderecos: Array<MapByEndereco>;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) { }
  ionViewDidLoad() {
    this.getMapByGeolocation();
    console.log('ionViewDidLoad MapaDetalhesPage');
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

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function (marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function (place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  getMapByEndereco(rua: string, numero: number, bairro: string, cidade: string, estado: string) {
    this.enderecos = [
      new MapByEndereco(rua, numero, bairro, cidade, estado)];
  }
  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

}
export class MapByEndereco {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string
  mapa: string;

  constructor(rua: string, numero: number, bairro: string, cidade: string, estado: string) {
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.mapa = this.getMapa();
  }

  private getEndereco() {
    return this.rua + ', ' + this.numero + ' - ' + this.bairro + ', ' + this.cidade + ' - ' + this.estado;
  }

  private getMapa() {
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.getEndereco() + '&key=AIzaSyAB27UwELNDCNs_c83ZG3d5ZpEk9r7GVxw'
  }
}
