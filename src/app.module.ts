import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroModule } from './superhero/superhero.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import redisConfig from "../redis-config";

@Module({
  imports: [
    SuperheroModule,
    RedisModule.forRoot(redisConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
