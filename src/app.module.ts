import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as process from "process";


const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'example';
//@ts-ignore
const port: number = process.env.POSTGRES_PORT || 5432;
const host = process.env.POSTGRES_HOST || 'localhost';
const type = process.env.DB_NAME || 'postgres';
const database = process.env.DB_NAME || 'postgres';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      //@ts-ignore
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}