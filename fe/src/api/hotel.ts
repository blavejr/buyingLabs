import { ISearchData } from "../types";
import api from "./index";

interface GetHotelsParams {
  page?: number;
  count?: number;
}

const buildQueryParams = (searchData: ISearchData): string => {
  const queryParams = new URLSearchParams(
    Object.entries(searchData)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [key, value instanceof Date ? value.toISOString() : encodeURIComponent(value)])
  );

  return queryParams.toString();
};

export const gethotels = async ({ page = 1, count = 1, ...searchData }: GetHotelsParams & ISearchData) => {
  try {
    const queryParams = buildQueryParams(searchData);
    const response = await api.get(`hotel?page=${page}&count=${count}${queryParams ? `&${queryParams}` : ''}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
};

const hotelAPI = {
  gethotels,
};

export default hotelAPI;
