import { Route } from "src/routes/entities/route.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('stop')
export class Stop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        nullable: true
    })
    lat: number;

    @Column({
        nullable: true
    })
    lng: number;

    @OneToMany(() => Route, (route: Route) => route.start, {
        onDelete: 'CASCADE'
    })
    firstStop: Route[];

    @OneToMany(() => Route, (route: Route) => route.end, {
        onDelete: 'CASCADE'
    })
    lastStop: Route[];
}