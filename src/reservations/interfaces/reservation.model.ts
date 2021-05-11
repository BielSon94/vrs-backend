import { Route as RouteI } from "src/routes/interfaces/route.model";
import { UserI } from "src/users/interfaces/user.interface";
import { ReservationStatus } from "../enums/reservation-status.enum";

export type GetReservationsResponse = {
    message: string;
    } | {
    message: string;
    reservations: ReservationI[];
}

export interface ReservationI {
    id?: string;
    status?: ReservationStatus;
    createdAt?: Date;
    updatedAt?: Date;
    user?: UserI;
    route?: RouteI;
}