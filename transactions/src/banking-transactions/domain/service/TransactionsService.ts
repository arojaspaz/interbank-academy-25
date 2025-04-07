import { Inject, Injectable } from '@nestjs/common';
import { TransactionsRepository } from '../repository/TransactionsRepository';
import { Transactions } from '../interfaces/Transactions';

@Injectable()
export class TransactionsDomainService {
    constructor(
        @Inject('TransactionsRepository')
        private readonly transactionRepository: TransactionsRepository
    ) { }

    async getReports(request: string): Promise<any> {
        const data = await this.transactionRepository.proccessTransactions(request);
        this.calculateTransactions(data);
        return data;
    }

    private calculateTransactions(data: Transactions[]): void {
        const summary = data.reduce(
            (acc, tx) => {
                // Balance
                if (tx.type === "Crédito") {
                    acc.balance += tx.amount;
                } else if (tx.type === "Débito") {
                    acc.balance -= tx.amount;
                }

                // Conteo por tipo
                acc.counts[tx.type] = (acc.counts[tx.type] || 0) + 1;

                // Transacción con monto más alto
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

        console.log(summary.counts);
        console.log(`ID: ${summary.maxTransaction.id}, Monto: ${summary.maxTransaction.amount}`);
        console.log(summary.balance);
    }

} 