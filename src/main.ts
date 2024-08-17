import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'package/http/response/response.interceptor';
import { LoggingInterceptor } from 'package/http/request/request.interceptor';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from 'package/exception/http-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor(new Logger()));
  app.useGlobalFilters(new AllExceptionsFilter(new Logger()));

  app.setGlobalPrefix('api/v1');

  await app.listen(3000, () => {
    console.log('server is running on port 3000');
  });
}
bootstrap();
