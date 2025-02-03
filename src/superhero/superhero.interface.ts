import {IsInt, Min, Max, IsOptional, IsString, IsIn} from 'class-validator';

export interface Superhero {
  id: string;
  name: string;
  power: string;
  humility: number;
}

export class CreateSuperheroDto {
  name: string;
  power: string;

  static maxHumilityValue = 10;

  @IsInt()
  @Min(1)
  @Max(CreateSuperheroDto.maxHumilityValue)
  humility: number;
}

export class GetSuperheroesDto {
  @IsOptional()
  @IsString()
  sortBy?: keyof Superhero;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}