import { Module } from '@nestjs/common';
import { BpiumModule } from './bpium/bpium.module';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BpiumModule, CarsModule],
})
export class AppModule {}
