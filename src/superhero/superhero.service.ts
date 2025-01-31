import { Injectable } from '@nestjs/common';
import { Superhero, CreateSuperheroDto } from './superhero.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];

  create(createSuperheroDto: CreateSuperheroDto): Superhero {
      const superhero: Superhero = {
          id: uuidv4(),
          ...createSuperheroDto,
      };

      this.superheroes.push(superhero);

      return superhero;
  }

  findAll(): Superhero[] {
      return this.superheroes;
  }
}
