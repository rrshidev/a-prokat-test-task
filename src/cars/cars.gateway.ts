import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject, forwardRef } from '@nestjs/common';
import { CarsService } from './cars.service';

@WebSocketGateway()
export class CarsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => CarsService))
    private readonly carsService: CarsService,
  ) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  async handleCarUpdate() {
    const activeCars = await this.carsService.getActiveCars();
    this.server.emit('cars_updated', activeCars);
  }
}
