import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsRepository } from '../../../src/banking-transactions/domain/ports/outbound/TransactionsRepository';
import { TransactionsDomainService } from '../../../src/banking-transactions/domain/service/TransactionsService';
import * as path from 'path';
import { existsSync } from 'fs';

const filePath = path.join(__dirname, '../../../src/common/utils/data.csv');

describe('TransactionDomainService', () => {
    let transactionsDomainService: TransactionsDomainService;
    let transactionDomainRepositoryMock: jest.Mocked<TransactionsRepository>;

    beforeEach(async () => {
        transactionDomainRepositoryMock = {
            proccessTransactions: jest.fn(),
        };
    
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            TransactionsDomainService,
            {
              provide: 'TransactionsRepository',
              useValue: transactionDomainRepositoryMock,
            },
          ],
        }).compile();
    
        transactionsDomainService = module.get<TransactionsDomainService>(TransactionsDomainService);
      });

      it('should be defined', () => {
        expect(transactionsDomainService).toBeDefined();
      });

      it('should call proccessTransactions and return modified response in getReports', async () => {
        const request: string =  filePath;
        const dataResponse = [
            { id: 1, type: 'Crédito', amount: 100 },
            { id: 2, type: 'Débito', amount: 50 },
            { id: 3, type: 'Crédito', amount: 200 },
          ];
        transactionDomainRepositoryMock.proccessTransactions.mockResolvedValue(dataResponse);
        const response = await transactionsDomainService.getReports(request);
        expect(transactionDomainRepositoryMock.proccessTransactions).toHaveBeenCalledWith(request);
        expect(response).toEqual(dataResponse);
      });
});