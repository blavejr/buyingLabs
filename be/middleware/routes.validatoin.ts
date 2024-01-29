import { Request, Response, NextFunction } from 'express';
import { isValidDateRange } from '../utils/dates';

export interface ValidatedRequest extends Request {
  validatedParams?: {
    currentPage: number;
    itemsPerPage: number;
    searchTerm: string;
    startDate: string;
    endDate: string;
    numberOfPeopleInt: number;
  };
}

export function validateGetHotelParamsMiddleware(req: ValidatedRequest, res: Response, next: NextFunction) {
  const { page, count, searchTerm, startDate, endDate, numberOfPeople, ...other } = req.query;

  const currentPage = parseInt(page as string);
  const itemsPerPage = parseInt(count as string);
  const numberOfPeopleInt = parseInt(numberOfPeople as string);

  if (Object.keys(other).length || !isValidDateRange(startDate as string, endDate as string)) {
    return res.status(400).json({ success: false, message: 'Invalid parameters' });
  }

  if (currentPage < 1 || itemsPerPage < 1) {
    return res.status(400).json({ success: false, message: 'Invalid parameters' });
  }

  req.validatedParams = {
    currentPage: currentPage!,
    itemsPerPage: itemsPerPage!,
    searchTerm: searchTerm as string,
    startDate: startDate as string,
    endDate: endDate as string,
    numberOfPeopleInt: numberOfPeopleInt!,
  };

  next();
}
