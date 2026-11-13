import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionsController } from './infrastructure/controllers/transactions.controller';
import { TransactionsService } from "./application/transactions.service";
import { TransactionEntity } from "./infrastructure/adapters/transaction.entity";
import { NftEntity } from '../nfts/infrastructure/adapters/nft.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([TransactionEntity, NftEntity])],
    controllers: [ TransactionsController ],
    providers: [ TransactionsService],
})
export class TransactionModule {}