import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  BadRequestException
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { Superhero, CreateSuperheroDto } from './superhero.interface';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(errors);
      },
    }),
  )
  createSuperhero(@Body() createSuperheroDto: CreateSuperheroDto) {
    return  this.superheroService.create(createSuperheroDto);;
  }

  @Get()
  findAll(): Superhero[] {
      return this.superheroService.findAll();
  }
}
