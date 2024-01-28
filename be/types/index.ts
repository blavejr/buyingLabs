import { Document } from "mongoose";

export interface IHotel extends Document {
  name: string;
  city: string;
  country: string;
  availability: { start: Date; end: Date } | boolean;
  price: number;
  photos?: string[];
  created_at: Date;
  updated_at: Date;
}

export type IAPIResponseType = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  data: IHotel[];
};
