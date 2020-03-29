export class Locality {
    categoria                : string;
    centroide_lat            : number;
    centroide_lon            : number;
    departamento_id          : number;
    departamento_nombre      : string;
    id                       : number;
    localidad_censal_id      : number;
    localidad_censal_nombre  : string;
    municipio_id             : number;
    municipio_nombre         : string;
    nombre                   : string;
    provincia_id             : number;
    provincia_nombre         : string;

    constructor(){
        alert('Constructor no creado.\nCrear a partir de los constructores de Province o Department como modelo base');
    }
}

/*
    "categoria": "Localidad simple",
    "centroide_lat": -33.4394729739475,
    "centroide_lon": -64.8316610855999,
    "departamento_id": "14098",
    "departamento_nombre": "Río Cuarto",
    "id": "14098270000",
    "localidad_censal_id": "14098270",
    "localidad_censal_nombre": "Suco",
    "municipio_id": "142588",
    "municipio_nombre": "Suco",
    "nombre": "SUCO",
    "provincia_id": "14",
    "provincia_nombre": "Córdoba"
*/