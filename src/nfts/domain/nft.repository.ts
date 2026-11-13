export interface NftRepository {
  findAll(): Promise<any[]>;
  create(nft: any): Promise<any>;
  save(nftData: any): Promise<any>;
}

export const NFT_REPOSITORY = 'NFT_REPOSITORY';