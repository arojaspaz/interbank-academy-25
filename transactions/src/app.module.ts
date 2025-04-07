import { Module } from '@nestjs/common';
import { TransactionModule } from './banking-transactions/infrastructure/bootstrap/TransactionModule';

@Module({
  imports: [TransactionModule]
})
export class AppModule {}
