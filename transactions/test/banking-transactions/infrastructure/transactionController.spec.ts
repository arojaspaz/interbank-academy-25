import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../../../src/banking-transactions/infrastructure/controller/TransactionController';
import { TransactionsApplicationService } from '../../../src/banking-transactions/application/service/TransactionService';
import * as path from 'path';

const transactionAplicationServiceMock = {
    getReports: jest.fn(),
};

describe('AiController', () => {
    let transactionController: TransactionController;
    let transactionAplicationService: TransactionsApplicationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [
                {
                    provide: TransactionsApplicationService,
                    useValue: transactionAplicationServiceMock,
                },
            ],
        }).compile();

        transactionController = module.get<TransactionController>(TransactionController);
        transactionAplicationService = module.get<TransactionsApplicationService>(TransactionsApplicationService);
    });

    it('should be defined', () => {
        expect(transactionController).toBeDefined();
    });

    it('should call AiAplicationService.getLoadAi and return result', async () => {
        const mockResponse = { option: 1 };
        transactionAplicationServiceMock.getReports.mockResolvedValue(mockResponse);
        const filePath = path.join(
            process.cwd(),
            'src',
            'common',
            'utils',
            'data.csv',
        );
        const response = await transactionController.proccess();
        expect(transactionAplicationService.getReports).toHaveBeenCalledWith(filePath);
        expect(response).toEqual(mockResponse);
    });
});