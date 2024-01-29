// routes.ts
import express, { Response, NextFunction } from 'express';
import moment from 'moment';
import * as hotelController from '../controllers/hotel';
import { validateGetHotelParamsMiddleware, ValidatedRequest } from '../validation/routes'; // Update the import

const router = express.Router();

router.get('/', validateGetHotelParamsMiddleware, async (req: ValidatedRequest, res: Response) => {
  const vGetHotelParams = req.validatedParams;

  const results = await hotelController.gethotels(
    vGetHotelParams!.currentPage,
    vGetHotelParams!.itemsPerPage,
    vGetHotelParams!.searchTerm as string,
    moment(vGetHotelParams!.startDate as string),
    moment(vGetHotelParams!.endDate as string),
    vGetHotelParams!.numberOfPeopleInt
  );
  res.json(results);
});

export default router;
