/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/
import mongoose from 'mongoose';
import { initMongoDb } from '../utils/dbInit';
import supertest from 'supertest';

import app from '../app';
import restaurantsUtils from '../utils/restaurantsUtils';
import { RestaurantType } from '../types';

const api = supertest(app);

beforeAll(async() => {
  await initMongoDb();
});

describe('general tests on response', () => {
  test('get status and type', async () => {
    await api
      .get('/discovery?lat=60.1709&lon=24.941')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('sections should have right title', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    expect(sections[0].title).toEqual('Popular Restaurants');
    expect(sections[1].title).toEqual('New Restaurants');
    expect(sections[2].title).toEqual('Nearby Restaurants');
  });

  test('sections should have right length', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    sections.forEach((section: { restaurants: RestaurantType[]; }) =>
      expect(section.restaurants).toHaveLength(10));
  });
});

describe('general tests on restaurants', () => {
  test('restaurants should be close enough', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    sections.forEach((section: { restaurants: RestaurantType[]; }) =>
      section.restaurants.forEach((p: RestaurantType) => (
        expect(
          restaurantsUtils.distance(60.1709, 24.941, p.location[1] as number, p.location[0] as number)
        ).toBeLessThan(1500)
      ))
    );
  });

  test('online restaurants should be in the head of lists', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    sections.forEach((section: { restaurants: RestaurantType[]; }) => {
      const onlineLists: boolean[] = section.restaurants.map((p: RestaurantType) => p.online);
      expect(restaurantsUtils.isSorted(onlineLists, -1)).toEqual(true);
    });
  });
});

describe('popular restaurants', () => {
  test('restaurants should be ordered by popularity(descending)', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    const popularityLists: number[] = sections[0].restaurants.map((p: RestaurantType) => p.popularity);
    expect(restaurantsUtils.isSorted(popularityLists, -1)).toEqual(true);
  });
});

describe('new restaurants', () => {
  test('restaurants should be created recently', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    sections[1].restaurants.forEach((p: RestaurantType) => {
      expect(restaurantsUtils.monthsDiff(new Date(p.launch_date), new Date())).toBeLessThan(6);
    });
  });

  test('restaurants should be ordered by create date(descending)', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    const timeLists: Date[] = sections[1].restaurants.map((p: RestaurantType) => new Date(p.launch_date));
    expect(restaurantsUtils.isSorted(timeLists, -1)).toEqual(true);
  });
});

describe('nearby restaurants', () => {
  test('restaurants should be ordered by distance(ascending)', async () => {
    const response = await api.get('/discovery?lat=60.1709&lon=24.941');
    const sections = response.body.sections;
    const distanceLists: number[] = sections[2].restaurants.map((p: RestaurantType) => {
      restaurantsUtils.distance(60.1709, 24.941, p.location[1] as number, p.location[0] as number);
    });
    expect(restaurantsUtils.isSorted(distanceLists, 1)).toEqual(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});