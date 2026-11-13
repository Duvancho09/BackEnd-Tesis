import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('nfts')
export class NftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  author: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  blockchain: string;

  @Column({ nullable: true })
  auctions: number;

  @CreateDateColumn()
  created_at: Date;
}