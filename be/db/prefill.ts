import mongoose from "mongoose";
import HotelModel  from "../models/hotel";
import generateDummyHotelData from "../utils/generateDummyHotelData";

const DB_ = mongoose.connection;

DB_.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

DB_.once("connected", () => {
  console.log("Connected to MongoDB for prefill");
});

async function prefill() {
  try {
    await mongoose.connect("mongodb://mongo:27017/travolta");
    await HotelModel.insertMany(generateDummyHotelData(100000));
    console.log("Database prefill successful");
  } finally {
    console.log("Database prefill complete");
    mongoose.connection.close();
  }
}

prefill();
