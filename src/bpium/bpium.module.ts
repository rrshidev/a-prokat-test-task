import { Module, OnModuleInit } from '@nestjs/common';
import { BpiumService } from './bpium.service';

@Module({
  providers: [BpiumService],
  exports: [BpiumService],
})
export class BpiumModule implements OnModuleInit {
  constructor(private bpiumService: BpiumService) {}

  async onModuleInit() {
    try {
      await this.bpiumService.testConnection();
      console.log('✅ Bpium connected successfully');
    } catch (e) {
      console.error('❌ Bpium connection error:', e.message);
    }
  }
}
