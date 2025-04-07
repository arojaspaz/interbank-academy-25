import { Transactions } from "../interfaces/Transactions";

export interface TransactionsRepository {
    proccessTransactions(transaction: string): Promise<any>;
}