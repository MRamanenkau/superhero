import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { Superhero, CreateSuperheroDto } from './superhero.interface';

@Controller('superhero')
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
}
