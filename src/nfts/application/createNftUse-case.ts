import { Injectable, Inject } from '@nestjs/common';
import { NFT_REPOSITORY } from '../domain/nft.repository';
import type { NftRepository } from '../domain/nft.repository';

@Injectable()
export class CreateNftUseCase {
  constructor(
    @Inject(NFT_REPOSITORY)
    private readonly nftRepository: NftRepository,
  ) {}

  async run(nftData: any): Promise<any> {
    return await this.nftRepository.save(nftData);
  }
}