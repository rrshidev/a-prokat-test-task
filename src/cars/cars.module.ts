import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsGateway } from './cars.gateway';

@Module({
  providers: [CarsService, CarsGateway],
  controllers: [CarsController]
})
export class CarsModule {}
