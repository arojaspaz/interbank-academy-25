import { Module } from '@nestjs/common';
import { TransactionController } from '../controller/TransactionController';
import { TransactionsApplicationService } from 'src/banking-transactions/application/service/TransactionService';
import { TransactionsDomainService } from 'src/banking-transactions/domain/service/TransactionsService';
import { TransactionCsvRepository } from '../repository/TransactionCsvRepository';

@Module({
    imports: [],
    controllers: [],
    providers: [
        TransactionsApplicationService,
        TransactionsDomainService,
        TransactionController,
        {
            provide: 'TransactionsRepository',
            useClass: TransactionCsvRepository
        }
    ],
})
export class TransactionModule { }