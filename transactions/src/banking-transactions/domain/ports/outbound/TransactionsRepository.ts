export interface TransactionsRepository {
    proccessTransactions(transaction: string): Promise<any>;
}