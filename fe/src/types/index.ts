export interface IHotel {
    name: string;
    city: string;
    country: string;
    // No need to return this from the backend, simply dont return the hotel if it's not available
    availability: boolean;
    price: number;
    photos?: string[];
  }
  
  export interface IHotelResponse {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    data: IHotel[];
  }