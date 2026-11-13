import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { TransactionsService } from "../../application/transactions.service";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) {}

    @Post('register')
    async register(@Body() body: { buyerId: number; nftId: number; txHash: string; price: number }) {
        return await this.transactionService.createTransaction(body);
    }

    @Get('user/:userId')
    async getTransactionsByUser(@Param('userId') userId: string) {
        return await this.transactionService.findByUser(Number(userId));
  }
}