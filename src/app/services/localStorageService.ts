import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() { }

    /**
     * Setear algo en el localStorage, puede ser un json
     */
    setObject = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * Obtener algo del localStorage
     */
    getObject = (key) => {
        var value = localStorage.getItem(key);
        return value !== 'undefined' ? value && JSON.parse(value) : undefined;
    }

    /**
     * Limpia el local storage
     */
    clearLocalStorage = () => {
        localStorage.clear();
    }
}
