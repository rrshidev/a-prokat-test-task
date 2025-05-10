import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject, Logger, forwardRef } from '@nestjs/common';
import { CarsService } from './cars.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CarsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(CarsGateway.name);

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
  broadcastNotification(message: string) {
    try {
      if (!this.server) {
        throw new Error('WebSocket server not initialized');
      }

      this.server.emit('global_notification', {
        event: 'admin_message',
        data: message,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(
        `Broadcasted to ${this.server.engine.clientsCount} clients`,
      );
    } catch (error) {
      this.logger.error('Broadcast failed', error.stack);
      throw error;
    }
  }

  getConnectedClients() {
    return {
      clientsCount: this.server?.engine?.clientsCount || 0,
      sockets: Array.from(this.server?.sockets?.sockets.keys() || []),
    };
  }
}
