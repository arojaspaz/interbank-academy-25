import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/banking-transactions/domain/ports/outbound/TransactionsRepository';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import { MapperTransaction } from '../support/MapperTransaction';

@Injectable()
export class TransactionCsvRepository implements TransactionsRepository {
    async proccessTransactions(transaction: string): Promise<any> {
        try {
            const data = await fs.readFile(transaction, 'utf-8');
            const workbook = XLSX.read(data, { type: 'string' });
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            const dataMapper = jsonData.map((item) => MapperTransaction.mapTransaction(item));
            return dataMapper;
        } catch (err) {
            console.error('Error al leer o procesar el archivo:', err);
            throw err;
        }
    }
}
