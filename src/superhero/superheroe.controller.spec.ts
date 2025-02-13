import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './superhero.interface';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('SuperheroesController', () => {
  let app: INestApplication;
  let controller: SuperheroController;

  const mockSuperheroService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [
        {
          provide: SuperheroService,
          useValue: mockSuperheroService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    controller = moduleFixture.get<SuperheroController>(SuperheroController);

    await app.init();
  });

  describe('create', () => {
    it(' => should create a new superhero with valid data', async () => {
      // arrange
      const createSuperheroDto = {
        name: 'Superman',
        power: 'Flying',
        humility: 5,
      };

      const superhero = {
        id: '123',
        name: 'Superman',
        power: 'Flying',
        humility: 5,
      };

      mockSuperheroService.create.mockReturnValueOnce(superhero);

      // act
      const response = await request(app.getHttpServer())
        .post('/superhero')
        .send(createSuperheroDto)
        .expect(201);

      // assert
      expect(mockSuperheroService.create).toBeCalledWith(createSuperheroDto);
      expect(response.body).toEqual(superhero);
    });
  })

  describe('create', () => {
    it('should return a validation error if humility is out of range', async () => {
      // arrange
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Superman',
        power: 'Flying',
        humility: 11, // Invalid humility value
      };

      // act
      const response = await request(app.getHttpServer())
        .post('/superhero')
        .send(createSuperheroDto)
        .expect(400);

      // assert
      expect(response.body.message[0].constraints.max).toEqual(
        `humility must not be greater than ${CreateSuperheroDto.maxHumilityValue}`,
      );
    });

    it('should return an empty array initially', async () => {
      // act
      const response = await request(app.getHttpServer())
        .get('/superhero')
        .expect(200);

      // assert
      expect(response.body).toEqual({});
    });

    it('should return all saved superheroes', async () => {
      // arrange
      const superhero = {
        id: '123',
        name: 'Superman',
        power: 'Flying',
        humility: 5,
      };

      const superheros = [superhero, superhero];

      mockSuperheroService.findAll.mockReturnValueOnce(superheros);

      // act
      const response = await request(app.getHttpServer())
        .get('/superhero')
        .expect(200);

      // assert
      expect(response.body).toEqual(superheros);
      expect(mockSuperheroService.findAll).toBeCalled();
    });

    it('should return superheroes sorted by humility in descending order', async () => {
      const superheros = [
        { id: '2', name: 'Batman', power: 'Intelligence', humility: 8 },
        { id: '1', name: 'Superman', power: 'Flying', humility: 5 },
      ];

      mockSuperheroService.findAll.mockReturnValueOnce(superheros);

      const response = await request(app.getHttpServer())
        .get('/superhero?sortBy=humility&order=desc')
        .expect(200);

      expect(response.body).toEqual(superheros);
      expect(mockSuperheroService.findAll).toBeCalledWith('humility', 'desc');
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
