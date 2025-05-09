import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
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
    const records = await this.bpiumService.getRecords(this.CATALOG_ID);
    return records.filter((record) => record.values.status === 'Работает');
  }

  async getCarById(id: string) {
    const car = await this.bpiumService.getRecord(this.CATALOG_ID, id);
    if (!car || car.values.status === 'Не работает') {
      throw new NotFoundException('Автомобиль не работает');
    }
    return car;
  }
  async createCar(title: string) {
    const result = await this.bpiumService.postRecord(this.CATALOG_ID, {
      title,
      status: 'Работает',
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
