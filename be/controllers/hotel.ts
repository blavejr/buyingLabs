import { IHotel, IAPIResponseType } from "../types";
import HotelModel from "../models/hotel";
import { Moment } from "moment";
import { filterByAvailability, filterBySearchCountryOrCity } from "../utils/filters";
import { paginate } from "../utils/pagination";
import { cacheNextPages } from "../utils/cache";

// The size of this cache is limited by the amount of memory available to the Node process
// But can be increased by using a database like Redis
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
    // Include information about both the current page and the next page in the cache key
    const cacheKey = `${currentPage}-${itemsPerPage}-${searchTerm}-${startDate?.format("YYYY-MM-DD")}-${endDate?.format("YYYY-MM-DD")}-${numberOfPeople}`;

    if (memoizedDBData.has(cacheKey)) {
      return memoizedDBData.get(cacheKey) as IAPIResponseType;
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

    const paginatedData = paginate(currentPage, itemsPerPage, filteredByAvailability);
    memoizedDBData.set(cacheKey, paginatedData);

    // Include information about the next page in the cache key for the next page's data
    // Cache the next 5 pages as well
    cacheNextPages(5,memoizedDBData, currentPage, itemsPerPage, searchTerm, startDate as Moment, endDate as Moment, numberOfPeople, filteredByAvailability);

    return paginatedData;

  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { success: false, message: "Error fetching hotels" };
  }
}
