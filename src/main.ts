import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
