import { Module, forwardRef } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsGateway } from './cars.gateway';
import { BpiumModule } from '../bpium/bpium.module';
import { SocketModule } from '@nestjs/websockets/socket-module';

@Module({
  imports: [forwardRef(() => BpiumModule), SocketModule],
  providers: [CarsService, CarsGateway],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
