import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Route } from 'src/routes/entities/route.entity';
import { Stop } from 'src/stops/entities/stop.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SearchService {

    constructor(
        //@Inject(RoutesService) private routesService: RoutesService,
        @InjectRepository(Route) private routeRepository: Repository<Route>,
        @InjectRepository(Stop) private stopRepository: Repository<Stop>,
    ) {}

    async filterRoute(from: string, to: string, arrival_date: Date): Promise<any> {

        /*const tempdata = await getManager().query(`
        SELECT DISTINCT route.id, route.arrival_date, stop.name INTO TEMP temp_table1
        FROM route INNER JOIN route_stops_stop ON route.id = route_stops_stop."routeId", stop
        WHERE stop.id = route_stops_stop."stopId"
        AND route.arrival_date > TIMESTAMP '${arrival_date}'
        GROUP BY route.id, stop.name
        HAVING stop.name = '${from}' OR stop.name = '${to}'
        `)

        const tempdata1 = await getManager().query(`
            SELECT DISTINCT id
            FROM temp_table1
            GROUP BY id
        `)

        const data = await this.routeRepository.findByIds(tempdata1, { relations: ['stops'] });

        console.log(tempdata1);
        return {
            data
        }
        */

    const message: string = "";
    const fromData = await this.stopRepository.findOne({name: from});
    const toData = await this.stopRepository.findOne({name: to});
    //const data = await this.routeRepository.findOne({arrival_date: MoreThanOrEqual(arrival_date), start: fromData, end: toData }, {relations: ['start', 'end']});

    if (!fromData || !toData) {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {arrival_date: arrival_date}});
        if(data.length < 1) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach NR 1"
            }
        }

        return {
            message: "Pobrano pomyślnie",
            data
        }
    } else if (fromData && toData && arrival_date) {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {start: fromData, end: toData, arrival_date: arrival_date}});
        if(data.length < 1) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach NR 2"
            }
        }

        return {
            message: "Pobrano pomyślnie",
            data
        }
    } else if (fromData && toData) {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {start: fromData, end: toData}});
        if(data.length < 1) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach NR 3"
            }
        }

        return {
            message: "Pobrano pomyślnie",
            data
        }
    }
    /*if (!arrival_date) {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {start: fromData, end: toData}});
        if(!data) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach"
            }
        }

        return {
            message: "Pobrano pomyślnie",
            data
        }
    } else if (!fromData) {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {arrival_date: MoreThanOrEqual(arrival_date), end: toData}});
        if(!data) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach"
            }
        }

        return {
            message: "Pobrano pomyślnie (BRAK POCZĄTKOWEGO)",
            data
        }
    } else if (!toData) {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {arrival_date: MoreThanOrEqual(arrival_date), start: fromData}});
        if(!data) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach"
            }
        }

        return {
            message: "Pobrano pomyślnie (BRAK KOŃCOWEGO)",
            data
        }
    } else {
        const data = await this.routeRepository.find({relations: ['start', 'end'], where: {arrival_date: MoreThanOrEqual(arrival_date)}});
        if(!data) {
            return {
                message: "Nie znaleziono żadnego kursu o podanych parametrach"
            }
        }

        return {
            message: "Pobrano pomyślnie (BRAK DO)",
            data
        }
    }*/

    //console.log(search);

    /*if(!data) {
        return {
            message: "Nie znaleziono żadnego kursu o podanych parametrach"
        }
    }

    return {
        message: "Pobrano pomyślnie",
        data
    }
    */

    }
}

/*
        const data = await this.routeRepository.find({
            select: ["arrival_date"],
            join: {
                alias: "Trasy",
            },
            where: {
                arrival_date: MoreThanOrEqual(arrival_date),
            }
        })

                const data = await this.routeRepository.find({
            select: ["arrival_date" "stops"],
            where: {
                arrival_date: MoreThanOrEqual(arrival_date)
            },
        })
        //const data = await this.routeRepository.createQueryBuilder("route").select("start").where(from = "start.name").getMany();
        console.log(data);

        return data
SELECT route.arrival_date, route.id, route_stops_stop."stopId", route_stops_stop."routeId", stop.name
	FROM route, route_stops_stop, stop
	WHERE route_stops_stop."routeId" = route.id
	AND route.arrival_date > TIMESTAMP '2021-05-25'
	AND stop.name = 'Rzeszów'

    SELECT route.arrival_date as "Data Podróży", stop.name as "Przystanek"
	FROM route JOIN route_stops_stop ON route.id = route_stops_stop."routeId", stop
	WHERE route.arrival_date > TIMESTAMP '2021-05-25'
	AND stop.name = 'Jasło'

    SELECT route.arrival_date as "Data Podróży", stop.name as "Przystanek"
	FROM route JOIN route_stops_stop ON route.id = route_stops_stop."routeId", stop
	WHERE route.arrival_date > TIMESTAMP '2021-05-25'
	AND stop.name = 'Jasło'

            SELECT DISTINCT route.*, stop
        FROM route INNER JOIN route_stops_stop ON route.id = route_stops_stop."routeId", stop
        WHERE stop.id = route_stops_stop."stopId"
        AND route.arrival_date > TIMESTAMP '2021-05-25'
        AND stop.name = '${from}'
        OR stop.name = '${to}'

    SELECT DISTINCT trasy.id as "Numer Kursu", trasy.arrival_date as "Data Kursu", przystanki.id as "Numer Przystanku", przystanki.name as "Nazwa Przystanku"
FROM route as trasy LEFT JOIN route_stops_stop ON trasy.id = route_stops_stop."routeId", stop as przystanki
WHERE trasy.arrival_date >= TIMESTAMP '2021-05-25'



SELECT DISTINCT route.id, route.arrival_date, stop.name INTO TEMP temp_table1
FROM route INNER JOIN route_stops_stop ON route.id = route_stops_stop."routeId", stop
WHERE stop.id = route_stops_stop."stopId"
AND route.arrival_date > TIMESTAMP '2021-05-25'
GROUP BY route.id, stop.name
HAVING stop.name = 'Przemyśl' OR stop.name = 'Kraków'


        SELECT DISTINCT route.id, route.arrival_date, stop.name
        FROM route INNER JOIN route_stops_stop ON route.id = route_stops_stop."routeId", stop
        WHERE stop.id = route_stops_stop."stopId"
        AND route.arrival_date > TIMESTAMP '${arrival_date}'
        GROUP BY route.id, stop.name
        HAVING stop.name = '${from}' OR stop.name = '${to}'
*/