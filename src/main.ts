import { NestFactory } from '@nestjs/core';
import { createAppModule } from './configuration.js';

async function bootstrap() {
  const AppModule = createAppModule();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
