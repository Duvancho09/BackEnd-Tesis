import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { NftEntity } from "../../../nfts/infrastructure/adapters/nft.entity";

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buyerId: number;

    @Column()
    nftId: number;

    @Column({ unique: true })
    txHash: string;

    @Column('decimal', { precision: 18, scale: 8 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => NftEntity)
    nft: NftEntity
}