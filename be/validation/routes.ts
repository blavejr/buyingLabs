import { isValidDateRange } from "../utils/dates";
import { Request } from "express";

export function validateGetHotelParameters(req: Request) {
    const {
      page,
      count,
      searchTerm,
      startDate,
      endDate,
      numberOfPeople,
      ...other
    } = req.query;
  
    const currentPage = parseInt(page as string);
    const itemsPerPage = parseInt(count as string);
    const numberOfPeopleInt = parseInt(numberOfPeople as string);
  
    // if other query params are present, return 400
    if (
      Object.keys(other).length ||
      !isValidDateRange(startDate as string, endDate as string)
    ) {
      return false;
    }
  
    // Validate parameters
    if (currentPage < 1 || itemsPerPage < 1) {
      return false;
    }
  
    return {
      currentPage,
      itemsPerPage,
      searchTerm,
      startDate,
      endDate,
      numberOfPeopleInt,
    };
  }