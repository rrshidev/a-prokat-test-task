import { Controller, Get } from '@nestjs/common';
import { CarsGateway } from './cars.gateway';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsGateway: CarsGateway) {}

  @Get('notify')
  async testNotify() {
    this.carsGateway.sendNotification('Test notification from API');
    return { status: 'Notification sent' };
  }
}
