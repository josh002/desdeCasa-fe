import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
import { Commerce } from 'src/app/models/commerce.model';
import { Client } from 'src/app/models/client.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";
import { Platform } from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    client: Client;
    commerces: Commerce[];

    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        public platform: Platform
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.client = this.localStorageService.getObject('client') === null ?
            undefined :
            new Client(this.localStorageService.getObject('client'));
        if (this.client === undefined) {
            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
            this.router.navigate(['/start']);
        }
        this.authService.getCommercesByUser(this.client.id)
            .then((resp: any) => {
                console.log('resp', resp);
                this.commerces = [];
                resp.result.forEach((element: any) => this.commerces.push(new Commerce(element)))
            })
            .catch(err => {
                
                console.log('err', err);
                if (err && err.error && err.error.status === -1) {
                    this.alertService.simpleAlert(err.error.message);
                } else {
                    this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                }
                this.router.navigate(['/start']);
            });
    }
    ngAfterViewInit() {
		this.platform.ready().then(() => this.loadMap());
	}

    loadMap() {
		/* The create() function will take the ID of your map element */
        const map = GoogleMaps.create('map');
        

		map.one( GoogleMapsEvent.MAP_READY ).then((data: any) => {
			const coordinates: LatLng = new LatLng(this.client.latitude, this.client.longitude);
        //POSICION DEL USUARIO
			map.setCameraTarget(coordinates);
            map.setCameraZoom(15);
            map.addMarker({
                title:'Mi ubicacion',
                icon: 'blue',
                animation: 'DROP',
                position :{
                    lat: this.client.latitude,
                    lng: this.client.longitude,
                }
            }).then((marker: Marker) => {
                marker.showInfoWindow();
            });
        
        //MOSTRANDO LOS COMERCIOS CERDA DEL USUARIO EN EL MAPA
        this.commerces.forEach((commerce)=>{
            map.addMarker({
                title: commerce.shopName,
                icon: 'red',
                animation: 'DROP',
                position :{
                    lat: commerce.latitude,
                    lng: commerce.longitude,
                }
            }).then((marker: Marker) => {
                marker.showInfoWindow();
            });
        })
        });
        
	}
    
}
