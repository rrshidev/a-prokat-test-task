import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { BpiumService } from '../bpium/bpium.service';
import { CarsGateway } from './cars.gateway';

@Injectable()
export class CarsService {
  constructor(
    private readonly bpiumService: BpiumService,
    @Inject(forwardRef(() => CarsGateway))
    private readonly carsGateway: CarsGateway,
  ) {}
  private readonly CATALOG_ID = '16';

  async getActiveCars() {
    console.log('NOW, I HERE!!!!!!!!!!');
    const records = await this.bpiumService.getRecords(this.CATALOG_ID);
    console.log('I HERE!!!!!!!!!!');
    console.log('ALL_RECORDS_FROM_BPIUM--->', records);
    return records.filter((record) => record.values[3] === '1');
  }

  async getCarById(id: string) {
    const car = await this.bpiumService.getRecord(this.CATALOG_ID, id);
    console.log('CAR_CARD--->', car);
    if (!car || car.values[3] === '2') {
      throw new NotFoundException('Автомобиль не работает');
    }
    return car;
  }
  async createCar(title: string) {
    console.log('TITLE OF CAR---->', title)
    const result = await this.bpiumService.postRecord(this.CATALOG_ID, {
      2: title,
      3: '1',
    });
    this.carsGateway.handleCarUpdate();
    return result;
  }

  async updateCar(id: string, data: { title?: string; isActive?: boolean }) {
    const status = data.isActive ? 'Работает' : 'Не работает';
    const result = await this.bpiumService.patchRecord(this.CATALOG_ID, id, {
      ...(data.title && { title: data.title }),
      status,
    });
    this.carsGateway.handleCarUpdate();
    return result;
  }
}
