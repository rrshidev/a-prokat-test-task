import { Module, forwardRef } from '@nestjs/common';
import { BpiumService } from './bpium.service';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports: [ConfigModule.forRoot(), forwardRef(() => CarsModule)],
  providers: [BpiumService],
  exports: [BpiumService],
})
export class BpiumModule {}
