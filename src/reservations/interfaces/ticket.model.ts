import { ReservationI } from "./reservation.model";

export type GetTicketResponse = {
    message: string;
    } | {
    message: string;
    ticket: ReservationI[]
}