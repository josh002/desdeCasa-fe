export class Province {
    id: number;
    nombre: string;
    centroide_lat: number;
    centroide_lon: number;

    constructor(
        province: {
            id: number,
            nombre: string,
            centroide_lat: number,
            centroide_lon: number,
        }
    ) {
        this.id = province.id;
        this.nombre = province.nombre;
        this.centroide_lat = province.centroide_lat;
        this.centroide_lon = province.centroide_lon;
    }
}

/*
    centroide_lat: -36.6769415180527
    centroide_lon: -60.5588319815719
    id: "06"
    nombre: "Buenos Aires"
*/