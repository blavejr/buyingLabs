import generateDummyHotelData from "../utils/generateDummyHotelData";
import paginate from "../utils/paginate";
import { IHotel, IAPIResponseType } from "../types";

const dummyHotelData: IHotel[] = generateDummyHotelData(10000);

export function gethotels(
  currentPage: number = 1,
  itemsPerPage: number = 4,
  searchTerm: string = ""
): IAPIResponseType {
  const lowerCaseSearch = searchTerm.toLowerCase();
  // if no search term is provided, return all hotels
  if (!searchTerm || searchTerm === "") {
    return paginate(dummyHotelData, currentPage, itemsPerPage);
  }
  // if search term is provided, filter hotels by search term
  const searchRes: IHotel[] = dummyHotelData.filter((hotel) => {
    // search by city and country
    const lowerCaseCity = hotel.city.toLowerCase();
    const lowerCaseCountry = hotel.country.toLowerCase();
    if (
      lowerCaseCity.includes(lowerCaseSearch) ||
      lowerCaseCountry.includes(lowerCaseSearch)
    ) {
      return hotel;
    }
  });
  return paginate(searchRes, currentPage, itemsPerPage);
}
