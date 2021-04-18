import { Stop } from "src/stops/interfaces/stop.model";

export interface Route {

    id?: number;

    start: string; //punkt startowy numer przystanku

    end: string; // PUNKT DOCELOWY numer przystanku

    arrival_date: Date; // Data podróży

    stops: Stop[] | null;//Array<Stop>; // Lista przystanków pomiędzy;
}