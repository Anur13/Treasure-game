import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HealthModule],
})
export class AppModule {}
