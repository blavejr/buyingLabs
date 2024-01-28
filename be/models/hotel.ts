import { Schema, model } from "mongoose";
import { IHotel } from "../types";

const HotelSchema = new Schema<IHotel>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    availability: { type: Schema.Types.Mixed, required: true },
    price: { type: Number, required: true },
    photos: { type: [String], required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const HotelModel = model<IHotel>("Hotel", HotelSchema);

export default HotelModel;
