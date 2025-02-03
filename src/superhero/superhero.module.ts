import { Module } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import { SuperheroGateway } from './superhero.gateway';

@Module({
  controllers: [SuperheroController],
  providers: [SuperheroService, SuperheroGateway],
})
export class SuperheroModule {}
