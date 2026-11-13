import { Controller, Get, Post, Body } from "@nestjs/common";
import { GetAllNftUseCase } from "../../application/getAllNftUse-case";
import { CreateNftUseCase } from "../../application/createNftUse-case";

@Controller('nfts')
export class NftsController {
    constructor(private readonly getAllNftUseCase: GetAllNftUseCase, private readonly createNftUseCase: CreateNftUseCase) {}

    @Get()
    async findAll() {
        return await this.getAllNftUseCase.run();
    }

    @Post()
    async create(@Body() nftData: any) {
        return await this.createNftUseCase.run(nftData);
    }
}