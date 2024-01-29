import { IHotel, IAPIResponseType } from "../types";
import HotelModel from "../models/hotel";
import { Moment } from "moment";
import { filterByAvailability, filterBySearchCountryOrCity } from "../utils/filters";
import { paginate } from "../utils/pagination";

const memoizedDBData = new Map<string, IAPIResponseType>();

export async function gethotels(
  currentPage: number = 1,
  itemsPerPage: number = 4,
  searchTerm: string = "",
  startDate?: Moment,
  endDate?: Moment,
  numberOfPeople: number = 1
): Promise<IAPIResponseType | { success: boolean; message: string }> {
  try {
    // We could hash this key to make it shorter
    const caxheKey = `${currentPage}-${itemsPerPage}-${searchTerm}-${startDate?.format("YYYY-MM-DD")}-${endDate?.format("YYYY-MM-DD")}-${numberOfPeople}`;
    if (memoizedDBData.has(caxheKey)) {
      return memoizedDBData.get(caxheKey) as IAPIResponseType;
    }
    
    const allHotels: IHotel[] = await HotelModel.find({}).exec();

    const filteredHotelsByCountryAndCity = filterBySearchCountryOrCity(
      allHotels,
      searchTerm
    );

    const filteredByAvailability = filterByAvailability(
      filteredHotelsByCountryAndCity,
      startDate,
      endDate
    );

    memoizedDBData.set(caxheKey, paginate(currentPage, itemsPerPage, filteredByAvailability));

    return memoizedDBData.get(caxheKey) as IAPIResponseType;

  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { success: false, message: "Error fetching hotels" };
  }
}
