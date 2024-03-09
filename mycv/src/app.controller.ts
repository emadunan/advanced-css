import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigService } from '@nestjs/config';

const conf = new ConfigService();

const dbName = conf.get<string>('DB_NAME');

console.log('DATABASE_NAME', dbName);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
