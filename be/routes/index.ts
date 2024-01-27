import express from "express";
import hotelRouter from "./hotel";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/hotel", hotelRouter);

export default router;