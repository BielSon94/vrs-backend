import { ReservationI } from "src/reservations/interfaces/reservation.model";
import { Stop } from "src/stops/interfaces/stop.model";

export interface Route {

    id?: number;

    start: Stop; //punkt startowy numer przystanku

    end: Stop; // PUNKT DOCELOWY numer przystanku

    arrival_date: Date; // Data podróży

    reservations: ReservationI
}