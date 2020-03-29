import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { appJsonHeader } from '../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private httpClient: HttpClient
    ) { }

    areYouThere = () =>
        this.httpClient.get(`${environment.WS_URL}/are-you-there`).toPromise()

    /**
     * Dadas cords latitud y longitud, retorna a un address
     */
    cordsToAddress = (cords: { latitude: number, longitude: number }): Promise<{ formatted_address: string }> =>
        this.httpClient.post(`${environment.WS_URL}/utils/cord-to-address`, cords, appJsonHeader)
            .toPromise()
            .then((resp: any) => resp.result)
            .catch((err: any) => { console.log('err', err); return err });


    getProvince = () => {
        let params = new HttpParams();
        params = params.append('aplanar', 'true');
        params = params.append('max', '1000');
        params = params.append('orden', 'nombre');
        return this.httpClient.get(`${environment.georef_ar_api}/provincias`, { params }).toPromise()
    }

    getDepartment = (provinceId: number) => {
        let params = new HttpParams();
        params = params.append('provincia', `${provinceId}`);
        params = params.append('aplanar', 'true');
        params = params.append('max', '1000');
        params = params.append('orden', 'nombre');
        return this.httpClient.get(`${environment.georef_ar_api}/departamentos`, { params }).toPromise()
    }

    getLocality = (departamentId: number) => {
        let params = new HttpParams();
        params = params.append('departamento', `${departamentId}`);
        params = params.append('aplanar', 'true');
        params = params.append('max', '1000');
        params = params.append('orden', 'nombre');
        console.log(params);
        return this.httpClient.get(`${environment.georef_ar_api}/localidades`, { params }).toPromise()
    }

}
