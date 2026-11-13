import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NftsModule } from "./nfts/nfts.module";
import { NftEntity } from "./nfts/infrastructure/adapters/nft.entity";
import { TransactionModule } from "./transactions/transactions.module";

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [NftEntity],
      synchronize: true,
    }),

    UsersModule,
    NftsModule,
    TransactionModule,
  ],
})
export class AppModule {}