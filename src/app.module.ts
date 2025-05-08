import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BpiumModule } from './bpium/bpium.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BpiumModule,
    CarsModule,
  ],
})
export class AppModule {}
