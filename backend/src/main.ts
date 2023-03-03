import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis/redis.adapter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Typography API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  const redisIoAdapter = new RedisIoAdapter(app);
  const redis: any = app.get<'REDIS'>('REDIS');
  await redisIoAdapter.connectToRedis(redis);
  app.useWebSocketAdapter(redisIoAdapter);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ? process.env.PORT : 4005);
}
bootstrap();
