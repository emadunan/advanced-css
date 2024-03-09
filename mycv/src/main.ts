import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { setup } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // setup(app);

  await app.listen(3000);
}
bootstrap();
