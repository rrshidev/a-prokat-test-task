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
    );
  }

  async getRecords(catalogId: string) {
    return this.bp.getRecords(catalogId);
  }

  async getRecord(catalogId: string, recordId: string) {
    const records = await this.bp.getRecords(catalogId, {
      $and: [{ id: recordId }],
    });
    return records?.[0];
  }

  async postRecord(catalogId: string, data: any) {
    return this.bp.postRecord(catalogId, data);
  }

  async patchRecord(catalogId: string, recordId: string, data: any) {
    return this.bp.patchRecord(catalogId, recordId, data);
  }

  async testConnection() {
    try {
      await this.bp.getCatalog();
      return { success: true };
    } catch (e) {
      throw new Error('Bpium connection failed: ' + e.message);
    }
  }
}
