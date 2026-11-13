import { Injectable, Inject } from '@nestjs/common';
import { NFT_REPOSITORY } from '../domain/nft.repository';
import type { NftRepository } from '../domain/nft.repository';

@Injectable()
export class GetAllNftUseCase {
    constructor(
        @Inject(NFT_REPOSITORY)
        private readonly nftRepository: NftRepository,
    ) {}

    async run(): Promise<any[]>{
        return await this.nftRepository.findAll();
    }
}