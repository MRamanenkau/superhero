import { Injectable } from '@nestjs/common';
import { Superhero, CreateSuperheroDto } from './superhero.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];

  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const superhero: Superhero = {
      id: uuid(),
      ...createSuperheroDto,
    };

    this.superheroes.push(superhero);

    return superhero;
  }

  findAll(sortBy?: keyof Superhero, order?: 'asc' | 'desc'): Superhero[] {
    if (!sortBy || !order) return this.superheroes;

    return [...this.superheroes].sort((a, b) => {
      const comparison = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
      return order === 'asc' ? comparison : -comparison;
    });
  }
}
