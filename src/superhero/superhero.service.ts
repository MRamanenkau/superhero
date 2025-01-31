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

  findAll(): Superhero[] {
      return this.superheroes;
  }
}
