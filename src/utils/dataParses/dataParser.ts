import { DataType, DataTypeDb, RestaurantType } from '../types';
import Restaurant from '../model/restaurant';

const isRestaurantType = (data: RestaurantType): data is RestaurantType => {
  return (
    typeof data.blurhash === 'string' &&
    typeof data.launch_date === 'string' &&
    typeof data.location === 'object' &&
    typeof data.location[0] === 'number' &&
    typeof data.location[1] === 'number' &&
    typeof data.name === 'string' &&
    typeof data.online === 'boolean' &&
    typeof data.popularity === 'number');
};

const isRestaurantsType = (data: RestaurantType[]): data is RestaurantType[] => {
  return data.every((p: RestaurantType) => isRestaurantType(p));
};

const isDataType = (data: DataType): boolean => {
  return (isRestaurantsType(data.restaurants));
};

export const parseData = (data: DataType): DataTypeDb => {
  if (!data || !isDataType(data))
    throw new Error('Invalid data');
  return {
    restaurants: data.restaurants.map(p => new Restaurant({
      ...p,
      loc: {
        type: 'Point',
        coordinates: p.location
      }
    })),
  };
};