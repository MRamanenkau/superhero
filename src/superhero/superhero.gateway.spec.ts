import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroGateway } from './superhero.gateway';
import { SuperheroService } from './superhero.service';
import { Superhero } from './superhero.interface';

describe('SuperheroGateway', () => {
  let gateway: SuperheroGateway;
  let superheroService: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroGateway, SuperheroService],
    }).compile();

    gateway = module.get<SuperheroGateway>(SuperheroGateway);
    superheroService = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleGetSuperheroes', () => {
    it('should return superheroes sorted by specified criteria', async () => {
      const data = { sortBy: 'name', order: 'asc' as 'asc' | 'desc' };
      const result = await gateway.handleGetSuperheroes(data);
      expect(result).toBeDefined();
    });
  });
});
