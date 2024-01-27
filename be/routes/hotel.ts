import express, { Request, Response } from "express";
import * as hotelController from "../controllers/hotel";

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    const { page, count, term, ...other } = req.query;
    const currentPage = parseInt(page as string);
    const itemsPerPage = parseInt(count as string);

    // if other query params are present, return 400
    if (Object.keys(other).length) {
      res.status(400).json({ message: "Bad request" });
    }
    
    if (
      !Number.isInteger(currentPage) ||
      !Number.isInteger(itemsPerPage) ||
      currentPage < 1 || itemsPerPage < 1
    ) {
      res.status(400).json({ message: "Bad request" });
    }

    const results = await hotelController.gethotels(currentPage, itemsPerPage, term as string);
    res.json(results);
  })

export default router;
