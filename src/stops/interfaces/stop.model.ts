import { Route } from "src/routes/interfaces/route.model";

export interface Stop {

    id?: number;

    name?: string;

    iat?: number | null;

    lat?: number | null;

    route?: Route[] | null;
}