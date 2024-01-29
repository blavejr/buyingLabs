import { IHotel } from "../types";
import { paginate } from "./pagination";
import { Moment } from "moment";

export function cacheNextPages(
  pagesToCache: number,
  cache: Map<string, any>,
  currentPage: number,
  itemsPerPage: number,
  searchTerm: string,
  startDate: Moment,
  endDate: Moment,
  numberOfPeople: number = 1,
  dataArray: IHotel[]
) {
  for (let i = 1; i <= pagesToCache; i++) {
    const cacheKey = `${currentPage + i}-${itemsPerPage}-${searchTerm}-${startDate.format("YYYY-MM-DD")}-${endDate.format("YYYY-MM-DD")}-${numberOfPeople}`;
    if (!cache.has(cacheKey)) {
      const paginatedData = paginate(currentPage + i, itemsPerPage, dataArray);
      cache.set(cacheKey, paginatedData);
    }
  }
}
