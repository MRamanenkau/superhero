import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, forwardRef, Logger } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { Superhero, GetSuperheroesDto } from './superhero.interface';

@WebSocketGateway(4321,{ cors: true, transports: ['websocket'] })
export class SuperheroGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SuperheroGateway');

  constructor(
    @Inject(forwardRef(() => SuperheroService))
    private readonly superheroService: SuperheroService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getSuperheroes')
  async handleGetSuperheroes(
    @MessageBody() data: GetSuperheroesDto,
  ): Promise<Superhero[]> {
    const validSortKeys: (keyof Superhero)[] = ['name', 'power', 'humility'];
    const sortBy =
      data.sortBy && validSortKeys.includes(data.sortBy)
        ? data.sortBy
        : undefined;

    const superheroes = this.superheroService.findAll(sortBy, data.order);
    return superheroes;
  }

  notifyClients() {
    this.server.emit('superheroesUpdated');
  }
}
