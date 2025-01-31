import { IsInt, Min, Max } from 'class-validator';

export interface Superhero {
  id: string;
  name: string;
  power: string;
  humility: number;
}

export class CreateSuperheroDto {
  name: string;
  power: string;

  @IsInt() // Ensures the value is an integer
  @Min(1)  // Ensures the value is at least 1
  @Max(10) // Ensures the value is at most 10
  humility: number;
}


