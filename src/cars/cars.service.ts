import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { BpiumService } from '../bpium/bpium.service';
import { CarsGateway } from './cars.gateway';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CarsService {
  constructor(
    private readonly bpiumService: BpiumService,
    @Inject(forwardRef(() => CarsGateway))
    private readonly carsGateway: CarsGateway,
    private readonly configService: ConfigService,
  ) {}
  private readonly CATALOG_ID = this.configService.get<string>('BP_CATALOG_ID');

  async getActiveCars() {
    const records = await this.bpiumService.getRecords(this.CATALOG_ID);
    return records.filter((record) => record.values[3] === '1');
  }

  async getCarById(id: string) {
    const car = await this.bpiumService.getRecord(this.CATALOG_ID, id);
    if (!car || car.values[3] === '2') {
      throw new NotFoundException('Автомобиль не работает');
    }
    return car;
  }
  async createCar(title: string) {
    const result = await this.bpiumService.postRecord(this.CATALOG_ID, {
      2: title,
      3: '1',
    });
    this.carsGateway.handleCarUpdate();
    return result;
  }

  async updateCar(recordId: string, title: string, status: string) {
    const data = {
      '2': title,
      '3': status,
    };
    const result = await this.bpiumService.patchRecord(
      this.CATALOG_ID,
      recordId,
      data,
    );
    this.carsGateway.handleCarUpdate();
    return result;
  }
}
