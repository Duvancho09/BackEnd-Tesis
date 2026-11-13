import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    apellido: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    celular: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash: string;

    @Column({ type: 'varchar', length: 42, unique: true, nullable: true })
    wallet_address: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name:'city', nullable: true })
    city: string;

    @Column({ name:'address', nullable: true })
    address: string;

    @Column({ name:'descriptionprofile', nullable: true })
    descriptionProfile: string;

    @Column({ name:'facebook', nullable: true })
    facebook: string;

    @Column({ name:'instagram', nullable: true })
    instagram: string;
}