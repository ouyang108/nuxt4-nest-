import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Config } from '@en/config';
import { InterceptorInterceptor } from '@libs/shared/interceptor/interceptor';
import { InterceptorExceptionFilter } from '@libs/shared/interceptor/exceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InterceptorInterceptor());
  app.useGlobalFilters(new InterceptorExceptionFilter());
  // 设置全局前缀
  app.setGlobalPrefix('api');
  // 全局使用 ValidationPipe 进行请求数据验证和转换
  app.useGlobalPipes(
    new ValidationPipe({
      // 1. 开启白名单模式：剔除 DTO 中没有声明的属性
      whitelist: true,
      // 2. (可选) 如果前端传了多余参数，直接抛出异常报错 (400 Bad Request)
      // forbidNonWhitelisted: true,
      // 3. 自动将 URL 字符串转为 DTO 定义的类型 (如 string 转 number)
      transform: true,
    }),
  );
  // 开启版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(Config.ports.server);
}
bootstrap().catch((err) => {
  console.error('应用启动失败:', err);
  process.exit(1);
});
