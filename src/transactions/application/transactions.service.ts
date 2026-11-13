import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { TransactionEntity } from "../infrastructure/adapters/transaction.entity";
import { NftEntity } from "../../nfts/infrastructure/adapters/nft.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,

        @InjectRepository(NftEntity)
        private readonly nftRepository: Repository<NftEntity>,
    ) {}

    async createTransaction(data: { buyerId: number; nftId: number; txHash: string; price: number }) {
        console.log('¡Transacción recibida en el backend y guardado en DB!', data);

        const nuevaTransaccion = this.transactionRepository.create(data);
        await this.transactionRepository.save(nuevaTransaccion);

        const nft = await this.nftRepository.findOne({ where: { id: data.nftId } });
        
        if(nft){
            nft.auctions = Math.max(0, (nft.auctions || 1) -1);
            await this.nftRepository.save(nft);
            console.log(`¡Stock actualizado! Al NFT "${nft.name}" le quedan ${nft.auctions} unidades.`);
        }

        return { success: true, message: 'Transacción registrada en Postgres con éxito' };
    }

    async findByUser(userId: number){
        return await this.transactionRepository.find({
            where: { buyerId: userId },
            relations: {
                nft: true,
            },
        });
    }
}