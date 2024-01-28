import { IHotel, IAPIResponseType } from "../types";
import HotelModel from "../models/hotel";

export async function gethotels(
  currentPage: number = 1,
  itemsPerPage: number = 4,
  searchTerm: string = ""
): Promise<IAPIResponseType | { success: boolean; message: string }> {
  try {
    const query: any = {};
    const lowerCaseSearch: string = searchTerm.toLowerCase();

    if (searchTerm && searchTerm !== "") {
      // If search term is provided, filter by name or city
      query.$or = [
        { name: { $regex: lowerCaseSearch, $options: "i" } },
        { city: { $regex: lowerCaseSearch, $options: "i" } },
      ];
    }

    // Execute the query to get paginated and filtered results
    const result: IHotel[] = await HotelModel.find(query)
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    // Get the total count for pagination
    const totalCount: number = await HotelModel.countDocuments(query).exec();

    return {
      currentPage,
      itemsPerPage,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / itemsPerPage),
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { success: false, message: "Error fetching hotels" };
  }
}
