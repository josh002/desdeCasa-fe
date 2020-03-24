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
  
    areYouThere = () =>
        this.httpClient.get(`${environment.WS_URL}/are-you-there`).toPromise()

    /**
     * Utilidades privadas de Auth
     */
    private appJsonHeader = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
    }
}
