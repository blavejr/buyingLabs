export type IHotel = {
    name: string;
    city: string;
    country: string;
    availability: boolean;
    price: number;
    photos: string[];
    [key: string]: any;
  }
  
  export type IAPIResponseType = {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    data: IHotel[];
  }