import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. POVOLÍME CORS (aby frontend z portu 3000 mohol volať tento backend)
  app.enableCors();

  // 2. ZMENÍME PORT na 4000 (aby sa to nebilo s Next.js na porte 3000)
  await app.listen(4000);
  
  console.log('Backend beží na: http://localhost:4000');
}
bootstrap();