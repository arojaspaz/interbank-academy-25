import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransactionController } from './banking-transactions/infrastructure/controller/TransactionController';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const transactionService = app.get(TransactionController);
  await transactionService.proccess();
  await app.close();
  /*const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);*/
}
bootstrap();
