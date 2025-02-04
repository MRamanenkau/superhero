import { Module } from '@nestjs/common';
import { SuperheroModule } from './superhero/superhero.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import redisConfig from "../redis-config";

@Module({
  imports: [
    SuperheroModule,
    RedisModule.forRoot(redisConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
