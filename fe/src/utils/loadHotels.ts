import { IHotel, ISearchData, IHotelResponse } from "../types";

export const loadHotels = async (
  currentPage: number,
  pageSize: number,
  totalPages: number,
  searchData: ISearchData,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setHotels: React.Dispatch<React.SetStateAction<Array<IHotel>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  HotelAPI: any
) => {
  
  if (currentPage <= totalPages && totalPages > 1) {
    setPage(currentPage + 1);  
    try {
      setIsLoading(true);
      HotelAPI.gethotels({
        page: currentPage + 1,
        count: pageSize,
        ...searchData
      }).then((response:IHotelResponse) =>{
        if (response.success === false) {
          return;          
        }
        setHotels((prevHotels) => [...prevHotels, ...response.data as IHotel[]]);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error loading more hotels:", error);
    }
  }
};
