import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Superhero, CreateSuperheroDto } from './superhero.interface';
import { v4 as uuid } from 'uuid';
import { SuperheroGateway } from './superhero.gateway';
import { RedisService } from '@liaoliaots/nestjs-redis';
import * as IORedis from 'ioredis';

@Injectable()
export class SuperheroService {
  private client: IORedis.Redis;

  constructor(
    @Inject(forwardRef(() => SuperheroGateway))
    private readonly superheroGateway: SuperheroGateway,
    private readonly redisService: RedisService,
  ) {
    this.client = this.redisService.getOrThrow();
  }

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    const superhero: Superhero = {
      id: uuid(),
      ...createSuperheroDto,
    };

    await this.client.hset(`superhero:${superhero.id}`, superhero);

    await this.client.lpush('superheroes', superhero.id);

    this.superheroGateway.notifyClients();

    return superhero;
  }

  async findAll(sortBy?: keyof Superhero, order: 'asc' | 'desc' = 'asc'): Promise<Superhero[]> {
    // Retrieve all superhero IDs from Redis
    const superheroIds = await this.client.lrange('superheroes', 0, -1);

    if (!superheroIds.length) return [];

    // Fetch superhero data
    const superheroes: Superhero[] = await Promise.all(
      superheroIds.map(async (id) => {
        const data = await this.client.hgetall(`superhero:${id}`);
        return data as unknown as Superhero; // Convert to Superhero type
      }),
    );

    if (sortBy) {
      superheroes.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Ensure numeric sorting
        if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
          aValue = Number(aValue);
          bValue = Number(bValue);
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        // String sorting
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return superheroes;
  }
}
