import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftEntity } from './infrastructure/adapters/nft.entity';
import { NftsController } from './infrastructure/controllers/nft.controller';
import { GetAllNftUseCase } from './application/getAllNftUse-case';
import { CreateNftUseCase } from './application/createNftUse-case';
import { NftRepositoryAdapter } from './infrastructure/adapters/nft.repository.adapter';
import { NFT_REPOSITORY } from './domain/nft.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NftEntity])],
  controllers: [NftsController],
  providers: [
    GetAllNftUseCase,
    CreateNftUseCase,
    {
      provide: NFT_REPOSITORY,
      useClass: NftRepositoryAdapter,
    },
  ],
})
export class NftsModule {}