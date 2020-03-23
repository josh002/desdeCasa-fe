import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor(
        private geolocation: Geolocation
    ) { }


    getCurrentLocation = (): Promise<{ latitude: number, longitude: number }> => 
        this.geolocation.getCurrentPosition()
            .then(
                ({ coords }) => ({ latitude: coords.latitude, longitude: coords.longitude })
            )

}


