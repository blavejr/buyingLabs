import { IHotel } from "../types";

export default function paginate(
  dataArray: IHotel[],
  currentPage: number,
  itemsPerPage: number
) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dataArray.slice(startIndex, endIndex);

  return {
    currentPage,
    itemsPerPage,
    totalItems: dataArray.length,
    totalPages: Math.ceil(dataArray.length / itemsPerPage),
    data: paginatedData,
  };
}