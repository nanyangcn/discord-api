import mongoose from 'mongoose';

export interface RestaurantTypeDb extends mongoose.Document {
  blurhash: string;
  launch_date: Date;
  loc: {
    type: string;
    coordinates: number[];
  }
  name: string;
  online: boolean;
  popularity: number;
}

export interface DataTypeDb {
  restaurants: RestaurantTypeDb[];
}

export interface RestaurantType {
  blurhash: string;
  launch_date: string;
  location: number[];
  name: string;
  online: boolean;
  popularity: number;
}

export interface DataType {
  restaurants: RestaurantType[]
}