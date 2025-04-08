import { Inject, Injectable } from '@nestjs/common';
import { TransactionsRepository } from '../ports/outbound/TransactionsRepository';
import { Transactions } from '../interfaces/Transactions';
import { GetReportsService } from '../ports/inbound/GetReportsService';

@Injectable()
export class TransactionsDomainService implements GetReportsService{
    constructor(
        @Inject('TransactionsRepository')
        private readonly transactionRepository: TransactionsRepository
    ) { }

    async getReports(request: string): Promise<any> {
        const data: Transactions[] = await this.transactionRepository.proccessTransactions(request);
        this.calculateTransactions(data);
        return data;
    }

    private calculateTransactions(data: Transactions[]): void {
        const summary = data.reduce(
            (acc, tx) => {
                if (tx.type === "Crédito") {
                    acc.balance += tx.amount;
                } else if (tx.type === "Débito") {
                    acc.balance -= tx.amount;
                }
                acc.counts[tx.type] = (acc.counts[tx.type] || 0) + 1;
                if (tx.amount > acc.maxTransaction.amount) {
                    acc.maxTransaction = tx;
                }
                return acc;
            },
            {
                balance: 0,
                counts: {} as Record<string, number>,
                maxTransaction: data[0],
            }
        );
        console.log('Reporte de Transacciones')
        console.log('--------------------------------------');
        console.log(`Balance Final: ${summary.balance}`);
        console.log(`Transacción de Mayor Monto: ID ${summary.maxTransaction.id} - ${summary.maxTransaction.amount}`);
        console.log(`Conteo de Transacciones: Crédito: ${summary.counts['Débito']} Débito:${summary.counts['Crédito']}`);
    }
} 