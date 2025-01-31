import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from "./superhero.interface";

const superman = {
  name: 'Superman',
  power: 'Flight',
  humility: 7,
} as CreateSuperheroDto;

const batman = {
  name: 'Batman',
  power: 'Martial Arts',
  humility: 4,
} as CreateSuperheroDto;


describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroService],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero', () => {
      const superhero = service.create(Object.assign(superman));
      expect(superhero).toHaveProperty('id');
      expect(superhero.name).toBe('Superman');
      expect(superhero.power).toBe('Flight');
      expect(superhero.humility).toBe(7);
    });
  });

  describe('findAll', () => {
    it('should return an empty array initially', () => {
      expect(service.findAll()).toEqual([]);
    });

    it('should return an array of superheroes', () => {
      service.create(Object.assign(superman));
      service.create(Object.assign(batman));

      expect(service.findAll()).toHaveLength(2);
    });
  });
});
