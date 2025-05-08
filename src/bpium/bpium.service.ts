import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import BP from 'bp-api';
import { BpiumConfigDto } from './dto/config.dto';

@Injectable()
export class BpiumService {
  private bp: BP;

  constructor(private configService: ConfigService<BpiumConfigDto>) {
    this.bp = new BP(
      this.configService.get('BP_DOMAIN'),
      this.configService.get('BP_LOGIN'),
      this.configService.get('BP_PASSWORD'),
      'https',
      5000,
    );
  }

  async testConnection() {
    try {
      await this.bp.getCatalog();
      return { success: true };
    } catch (e) {
      throw new Error('Bpium connection failed: ' + e.message);
    }
  }

  async getCars() {
    const api_id: string = this.configService.get('BP_PASSWORD');
    return this.bp.getRecords(api_id);
  }
}
