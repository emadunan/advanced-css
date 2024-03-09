import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

export function setup(app: INestApplication) {
  app.use(
    cookieSession({
      keys: ['emadtest'],
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
}
