import mongoose from 'mongoose';
import fs from 'fs';

import config from './config';
import logger from './logger';
import Restaurant from '../model/restaurant';
import { parseData } from './dataParser';

export const connectMongoDb = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    logger.info('Connected to MongoDB');
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    logger.error(`Error connection to MongoDB:${String(err.message)}`);
  }
};

export const initMongoDb = async (): Promise<void> => {
  try {
    await Restaurant.deleteMany({});
    const rawData = fs.readFileSync('./data/restaurants.json', { encoding: 'utf8' });
    const data = parseData(JSON.parse(rawData));
    await Restaurant.create(data.restaurants);
    logger.info('Intialized to MongoDB');
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new Error(`Error initialization to MongoDB:${String(err.message)}`);
  }
};