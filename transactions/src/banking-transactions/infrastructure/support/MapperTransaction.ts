import { Transactions } from "src/banking-transactions/domain/interfaces/Transactions";

export class MapperTransaction {
    static mapTransaction(data: any): Transactions {
        return {
            id: data.id, 
            type: data.tipo, 
            amount: data.monto
        }
    }
}