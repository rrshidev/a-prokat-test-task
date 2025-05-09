import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from '../bpium/dto/create-car.dto';
import { UpdateCarDto } from '../bpium/dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

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
  async updateCar(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    return this.carsService.updateCar(id, dto);
  }
}
