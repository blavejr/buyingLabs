import { IHotel, IAPIResponseType } from "../types";
import HotelModel from "../models/hotel";
import { Moment } from "moment";
import { filterByAvailability, filterBySearchCountryOrCity } from "../utils/filters";
import { paginate } from "../utils/pagination";

export async function gethotels(
  currentPage: number = 1,
  itemsPerPage: number = 4,
  searchTerm: string = "",
  startDate?: Moment,
  endDate?: Moment,
  numberOfPeople: number = 1
): Promise<IAPIResponseType | { success: boolean; message: string }> {
  try {
    // getting all the data from the DB every time is not efficient and is a very expensive operation
    // but since the db was not part of the task, I decided to not use complicated queries and rather do the filtering in arrays as if the data was hardcoded
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

    return paginate(currentPage, itemsPerPage, filteredByAvailability);

  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { success: false, message: "Error fetching hotels" };
  }
}
