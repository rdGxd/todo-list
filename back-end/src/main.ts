import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalPipesConfig } from './global/pipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(...GlobalPipesConfig());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
