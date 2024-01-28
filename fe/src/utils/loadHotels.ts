import { IHotel } from "../types";

export const loadHotels = async (
  currentPage: number,
  pageSize: number,
  totalPages: number,
  searchTerm: string | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setHotels: React.Dispatch<React.SetStateAction<Array<IHotel>>>,
  HotelAPI: any
) => {
  if (currentPage <= totalPages) {
    setPage((prevPage) => prevPage + 1);
    try {
      const response = await HotelAPI.gethotels(
        currentPage,
        pageSize,
        searchTerm
      );
      setHotels((prevHotels) => [...prevHotels, ...response.data]);
    } catch (error) {
      console.error("Error loading more hotels:", error);
    } finally {
      console.log("finally");
    }
  }
};
