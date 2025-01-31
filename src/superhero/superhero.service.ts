import { Injectable, NotFoundException } from '@nestjs/common';
import { Superhero, CreateSuperheroDto, UpdateSuperheroDto } from './superhero.interface';
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

findOne(id: string): Superhero {
    const superhero = this.superheroes.find(hero => hero.id === id);
    if (!superhero) {
    throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    return superhero;
}

update(id: string, updateSuperheroDto: UpdateSuperheroDto): Superhero {
    const index = this.superheroes.findIndex(hero => hero.id === id);
    if (index === -1) {
    throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    
    this.superheroes[index] = {
    ...this.superheroes[index],
    ...updateSuperheroDto,
    };
    
    return this.superheroes[index];
}

remove(id: string): void {
    const index = this.superheroes.findIndex(hero => hero.id === id);
    if (index === -1) {
    throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    this.superheroes.splice(index, 1);
}
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class SuperheroService {}
