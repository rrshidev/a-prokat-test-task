import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BpiumService } from './bpium.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [BpiumService],
  exports: [BpiumService],
})
export class BpiumModule {}
