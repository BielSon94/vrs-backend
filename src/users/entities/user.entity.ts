import { hash } from "bcryptjs";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { ReservationI } from "src/reservations/interfaces/reservation.model";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        select: false,
    })
    password: string;

    @Column({
        name: "first_name",
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    firstName: string;

    @Column({
        name: "last_name",
        type: 'varchar',
        length: 30,
        nullable: true
    })
    lastName: string;

    @Column({
        name: "birth_date",
        type: 'date'
    })
    birthDate: Date;

    @Column({
        default: false
    })
    isEmployee: boolean;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp"
    })
    updatedAt: Date;

    @OneToMany(type => Reservation, reservation => reservation.user, { onDelete: "CASCADE"})
    reservations: ReservationI[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    async emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

}