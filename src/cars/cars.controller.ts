import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsGateway } from './cars.gateway';
import { CreateCarDto } from '../bpium/dto/create-car.dto';
import { UpdateCarDto } from '../bpium/dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly carsGateway: CarsGateway,
  ) {}

  @Get()
  async getActiveCars() {
    return this.carsService.getActiveCars();
  }

  @Get(':id')
  async getCar(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }

  @Post()
  async createCar(@Body() dto: CreateCarDto) {
    return this.carsService.createCar(dto.title);
  }

  @Put(':id')
  async updateCar(@Param('id') recordId: string, @Body() dto: UpdateCarDto) {
    return this.carsService.updateCar(recordId, dto.title, dto.status);
  }

  @Get('notify')
  async sendNotification(@Query('message') message = 'Default notification') {
    this.carsGateway.broadcastNotification(message);
    return {
      success: true,
      message: 'Notification sent to all connected clients',
    };
  }
}
