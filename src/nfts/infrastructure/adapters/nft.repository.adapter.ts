import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NftRepository } from '../../domain/nft.repository';
import { NftEntity } from '../adapters/nft.entity';

@Injectable()
export class NftRepositoryAdapter implements NftRepository {
  constructor(
    @InjectRepository(NftEntity)
    private readonly nftrepository: Repository<NftEntity>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.nftrepository.find();
  }

  async save(nftData: any): Promise<any> {
    const newNft = this.nftrepository.create(nftData);
    return await this.nftrepository.save(newNft);
  }

  async create(nft: any): Promise<any> {
    const newNft = this.nftrepository.create(nft);
    return await this.nftrepository.save(newNft);
  }
}