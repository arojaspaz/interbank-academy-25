import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsApplicationService } from '../../../src/banking-transactions/application/service/TransactionService';
import { TransactionsDomainService } from '../../../src/banking-transactions/domain/service/TransactionsService';
import * as path from 'path';
import { existsSync } from 'fs';

const filePath = path.join(__dirname, '../../../src/common/utils/data.csv');

const transactionServiceMock = {
    getReports: jest.fn(),
};


describe('TransactionApplicationService', () => {
    let transactionApplicationService: TransactionsApplicationService;
    let transactionsDomainService: TransactionsDomainService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsApplicationService,
                {
                    provide: TransactionsDomainService,
                    useValue: transactionServiceMock,
                },
            ],
        }).compile();

        transactionApplicationService = module.get<TransactionsApplicationService>(TransactionsApplicationService);
        transactionsDomainService = module.get<TransactionsDomainService>(TransactionsDomainService);
    });

    it('should be defined', () => {
        expect(transactionsDomainService).toBeDefined();
    });

    it('should call proccessTransactions and return modified response in getReports', async () => {
        const request: string = filePath;
        const dataResponse = [
            { id: 1, type: 'Crédito', amount: 100 },
            { id: 2, type: 'Débito', amount: 50 },
            { id: 3, type: 'Crédito', amount: 200 },
        ];
        transactionServiceMock.getReports.mockResolvedValue(dataResponse);
        const response = await transactionsDomainService.getReports(request);
        expect(transactionServiceMock.getReports).toHaveBeenCalledWith(request);
        expect(response).toEqual(dataResponse);
    });
});