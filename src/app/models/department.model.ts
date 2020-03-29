export class Department {
    id: number;
    nombre: string;
    centroide_lat: number;
    centroide_lon: number;
    provincia_id: number;
    provincia_nombre: string;

    constructor(
        department: {
            id: number,
            nombre: string,
            centroide_lat: number,
            centroide_lon: number,
            provincia_id: number;
            provincia_nombre: string;
        }
    ) {
        this.id = department.id;
        this.nombre = department.nombre;
        this.centroide_lat = department.centroide_lat;
        this.centroide_lon = department.centroide_lon;
        this.provincia_id = department.provincia_id;
        this.provincia_nombre = department.provincia_nombre;
    }
}

/*
    "centroide_lat": -27.2575511794731,
    "centroide_lon": -60.6806781684245,
    "id": "22112",
    "nombre": "O'Higgins",
    "provincia_id": "22",
    "provincia_nombre": "Chaco";
*/