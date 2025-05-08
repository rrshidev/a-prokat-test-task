import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import BP from 'bp-api';

@Injectable()
export class BpiumService extends BP {
  constructor(private configService: ConfigService) {
    super({
      domain: configService.get('BP_DOMAIN'),
      login: configService.get('BP_LOGIN'),
      password: configService.get('BP_PASSWORD'),
    });
  }
}
