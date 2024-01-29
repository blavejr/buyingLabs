import { Document } from "mongoose";

export interface IHotel {
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
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  totalPages?: number;
  data?: IHotel[];
  success?: boolean;
  message?: string;
};

export interface ValidatedRequest extends Request {
  validatedParams?: {
    currentPage: number;
    itemsPerPage: number;
    searchTerm: string;
    startDate: string;
    endDate: string;
    numberOfPeopleInt: number;
  };
}

