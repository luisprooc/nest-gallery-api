import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('Gallery API')
  .setDescription('The Gallery API description')
  .setVersion('1.0')
  .addTag('documentation')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(AppModule.port || 3000);
}
bootstrap();
