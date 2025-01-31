import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { Superhero, CreateSuperheroDto, UpdateSuperheroDto } from './superhero.interface';

@Controller('superheroes')
export class SuperheroController {
constructor(private readonly superheroService: SuperheroService) {}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() createSuperheroDto: CreateSuperheroDto): Superhero {
    return this.superheroService.create(createSuperheroDto);
}

@Get()
findAll(): Superhero[] {
    return this.superheroService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string): Superhero {
    return this.superheroService.findOne(id);
}

@Put(':id')
update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
): Superhero {
    return this.superheroService.update(id, updateSuperheroDto);
}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
remove(@Param('id') id: string): void {
    this.superheroService.remove(id);
}
}

import { Controller } from '@nestjs/common';

@Controller('superhero')
export class SuperheroController {}
