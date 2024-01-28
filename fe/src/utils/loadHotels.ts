import { IHotel, ISearchData } from "../types";

export const loadHotels = async (
  currentPage: number,
  pageSize: number,
  totalPages: number,
  searchData: ISearchData,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setHotels: React.Dispatch<React.SetStateAction<Array<IHotel>>>,
  HotelAPI: any
) => {
  if (currentPage <= totalPages) {
    setPage((prevPage) => prevPage + 1);
    try {
      const response = await HotelAPI.gethotels({
        page: currentPage,
        count: pageSize,
        ...searchData
      });
      setHotels((prevHotels) => [...prevHotels, ...response.data]);
    } catch (error) {
      console.error("Error loading more hotels:", error);
    } finally {
      console.log("finally");
    }
  }
};
