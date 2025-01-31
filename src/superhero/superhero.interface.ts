export interface Superhero {
id: string;
name: string;
powers: string[];
universe: 'DC' | 'Marvel' | 'Other';
active: boolean;
}

export class CreateSuperheroDto {
name: string;
powers: string[];
universe: 'DC' | 'Marvel' | 'Other';
active: boolean;
}

export class UpdateSuperheroDto {
name?: string;
powers?: string[];
universe?: 'DC' | 'Marvel' | 'Other';
active?: boolean;
}

