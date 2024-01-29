import express, { Request, Response } from "express";
import moment, { Moment } from "moment";
import * as hotelController from "../controllers/hotel";
import { isValidDateRange } from "../utils/dates";
import { validateGetHotelParameters } from "../validation/routes";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const vGetHotelParams = validateGetHotelParameters(req);
  // if validation fails, return 400
  // I want to keep all responses in the routes file
  if (!vGetHotelParams) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid parameters" });
  }

  const results = await hotelController.gethotels(
    vGetHotelParams.currentPage,
    vGetHotelParams.itemsPerPage,
    vGetHotelParams.searchTerm as string,
    moment(vGetHotelParams.startDate as string),
    moment(vGetHotelParams.endDate as string),
    vGetHotelParams.numberOfPeopleInt
  );
  res.json(results);
});

export default router;
