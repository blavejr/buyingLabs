import { IHotel } from "../types";
import moment, { Moment } from "moment";

export function filterBySearchCountryOrCity(hotels: IHotel[], searchTerm: string): IHotel[] {
    const lowerCaseSearch = searchTerm.toLowerCase();
  
    return hotels.filter((hotel) => {
      return (
        hotel.city.toLowerCase().includes(lowerCaseSearch) ||
        hotel.country.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }
  
  export function filterByAvailability(
    hotels: IHotel[],
    startDate?: Moment,
    endDate?: Moment
  ): IHotel[] {
    return hotels.filter((hotel) => {
      if (
        typeof hotel.availability === "object" &&
        "start" in hotel.availability &&
        "end" in hotel.availability
      ) {
        const availabilityStart = moment(hotel.availability.start);
        const availabilityEnd = moment(hotel.availability.end);
  
        return (
          availabilityStart.isSameOrAfter(startDate) &&
          availabilityEnd.isBefore(endDate)
        );
      }
    });
  }