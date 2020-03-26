export class Timetable {
    id: number;
    description: string;
    constructor(
        timetable?: Timetable |
        {
            id: number;
            description: string;
        }
    ) {
        this.id = timetable.id;
        this.description = timetable.description;
    }
}
