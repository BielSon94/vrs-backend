import { Route } from "src/routes/entities/route.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('stop')
export class Stop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    lat: number;

    @Column({
        nullable: true
    })
    lng: number;

    @ManyToMany(() => Route, (route: Route) => route.stops)
    route: Route[];

    @OneToOne(() => Route, (route: Route) => route.start)
    firstStop: Route;

    @OneToOne(() => Route, (route: Route) => route.end)
    lastStop: Route;
}