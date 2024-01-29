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
    // This can also be used to cache data for the next 2 pages, 3 pages, etc. by using a loop
    const nextPageCacheKey = `${currentPage + 1}-${itemsPerPage}-${searchTerm}-${startDate?.format("YYYY-MM-DD")}-${endDate?.format("YYYY-MM-DD")}-${numberOfPeople}`;
    if (!memoizedDBData.has(nextPageCacheKey)) {
      const nextPageData = paginate(currentPage + 1, itemsPerPage, filteredByAvailability);
      memoizedDBData.set(nextPageCacheKey, nextPageData);
    }

    return paginatedData;

  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { success: false, message: "Error fetching hotels" };
  }
}
