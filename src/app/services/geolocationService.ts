import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor(
        private geolocation: Geolocation
    ) { }


    getCurrentLocation = () => 
        this.geolocation.getCurrentPosition()
            .then(
                resp => {
                    debugger;
                    return resp.coords;
                }
            )

}


