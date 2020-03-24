import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getDepartment = () => {
        let params = new HttpParams();
        params = params.append('provincia', 'Santa Fe');
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

    getStreet = (localidadId: number) => {
        let params = new HttpParams();
        params = params.append('localidad_censal', `${localidadId}`);
        params = params.append('aplanar', 'true');
        params = params.append('max', '1000');
        params = params.append('orden', 'nombre');
        console.log(params);
        return this.httpClient.get(`${environment.georef_ar_api}/calles`, { params }).toPromise()
    }

    areYouThere = () =>
        this.httpClient.get(`${environment.WS_URL}/are-you-there`).toPromise()

    /**
     * Utilidades privadas de Auth
     */
    private appJsonHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }
}
