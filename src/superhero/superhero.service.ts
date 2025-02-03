import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Superhero, CreateSuperheroDto } from './superhero.interface';
import { v4 as uuid } from 'uuid';
import { SuperheroGateway } from './superhero.gateway';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];

  constructor(
    @Inject(forwardRef(() => SuperheroGateway))
    private readonly superheroGateway: SuperheroGateway
  ) {}

  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const superhero: Superhero = {
      id: uuid(),
      ...createSuperheroDto,
    };

    this.superheroes.push(superhero);

    this.superheroGateway.notifyClients();

    return superhero;
  }

  findAll(sortBy?: keyof Superhero, order: 'asc' | 'desc' = 'asc'): Superhero[] {
    if (sortBy) {
      return [...this.superheroes].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        // Ensure values are numbers before sorting
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        // If values are strings, sort alphabetically
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return 0; // Keep order if values are not comparable
      });
    }
    return this.superheroes;
  }
}
