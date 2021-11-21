import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IsAuthenticatedGuard } from './authentication/is-authenticated.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(new IsAuthenticatedGuard(new Reflector()));
    await app.listen(3000);
}
bootstrap();
