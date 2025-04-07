import { Injectable } from '@nestjs/common';
import { TransactionsDomainService } from 'src/banking-transactions/domain/service/TransactionsService';

@Injectable()
export class TransactionsApplicationService {
    constructor(
        private readonly transactionDomainService: TransactionsDomainService
    ){}

    async getReports(request: string): Promise<any> {
        return this.transactionDomainService.getReports(request);
    }
}