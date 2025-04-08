import { Transactions } from "../../interfaces/Transactions";

export interface GetReportsService {
    getReports(request: string): Promise<Transactions[]>
}