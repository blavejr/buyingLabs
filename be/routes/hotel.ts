import express, { Request, Response } from "express";
import moment, { Moment } from "moment";
import * as hotelController from "../controllers/hotel";
import { isValidDateRange } from "../utils/dates";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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
    res.status(400).json({ message: "Bad request" });
    return;
  }

  // Validate parameters
  if (currentPage < 1 || itemsPerPage < 1) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  const results = await hotelController.gethotels(
    currentPage,
    itemsPerPage,
    searchTerm as string,
    moment(startDate as string),
    moment(endDate as string),
    numberOfPeopleInt
  );
  res.json(results);
});

export default router;
