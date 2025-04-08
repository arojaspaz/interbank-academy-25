import { Injectable } from '@nestjs/common';
import { TransactionsApplicationService } from '../../application/service/TransactionService';
import * as path from 'path';

@Injectable()
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionsApplicationService,
    ) { }

    async proccess(): Promise<any> {
        const filePath = path.join(
            process.cwd(),
            'src',
            'common',
            'utils',
            'data.csv',
        );
        return this.transactionService.getReports(filePath);
    }
}

