import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('WebSocket server running on ws://localhost:3000');
}
bootstrap();
