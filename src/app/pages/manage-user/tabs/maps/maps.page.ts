import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
import { Commerce } from 'src/app/models/commerce.model';
import { Client } from 'src/app/models/client.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker, GoogleMap } from "@ionic-native/google-maps";
import { Platform } from "@ionic/angular";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
    mylat;
    mylng;
    client: Client;
    commerces: Commerce[];
    map:GoogleMap;
    private backButtonSubscription;
    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        public platform: Platform,
        private nativeGeocoder: NativeGeocoder
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
        this.getGeocoder();
        
    }
    
    getGeocoder() {
        this.nativeGeocoder.forwardGeocode(this.client.address)
            .then((result: NativeGeocoderResult[]) => {
                this.mylat = result[0].latitude;
                this.mylng = result[0].longitude;
            })
            .catch((error: any) => console.log(error));
    }

    ionViewDidEnter() {
        this.backButtonSubscription = this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });       
    }

    ngAfterViewInit() {
		this.platform.ready().then(() => this.loadMap());
	}
    
    ionViewWillLeave() {
        this.backButtonSubscription.unsubscribe();
    }

    loadMap() {
        /* The create() function will take the ID of your map element */
        this.map = GoogleMaps.create('map');

        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
            const coordinates: LatLng = new LatLng(this.mylat, this.mylng);
            //POSICION DEL USUARIO
            this.map.setCameraTarget(coordinates);
            this.map.setCameraZoom(15);
            this.map.addMarker({
                title: 'Mi Casa',
                icon: 'red',
                animation: 'DROP',
                position: coordinates,
            }).then((marker: Marker) => {
                marker.showInfoWindow();
            });

            //MOSTRANDO LOS COMERCIOS CERDA DEL USUARIO EN EL MAPA
            this.commerces.forEach((commerce) => {
                this.map.addMarker({
                    title: commerce.shopName,
                    icon: 'rgb(2, 119, 172)',
                    animation: 'DROP',
                    position: {
                        lat: commerce.latitude,
                        lng: commerce.longitude,
                    }
                }).then((marker: Marker) => {
                    marker.showInfoWindow();
                    this.onMarketClick(marker, commerce);
                });
            })
        });

    }
    onMarketClick(marker: Marker, commerce) {
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(x => {
            this.alertService.marketMapAlert(commerce.shopName, 'Telefono : ' + commerce.phone, commerce.address, commerce.id)
        });
    }
}
