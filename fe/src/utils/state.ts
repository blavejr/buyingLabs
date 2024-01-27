import { IHotelResponse } from "../types";

export const hotelResponse: IHotelResponse = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 1,
    totalPages: 1,
    data: [
      {
        name: "Loading Hotel",
        city: "Loading City",
        country: "Loading Country",
        availability: true,
        price: 100,
        photos: [
          "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
          "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
          "https://media.istockphoto.com/id/472899538/de/foto/eingang-von-hotel-in-der-innenstadt-von-cleveland-und-warten-taxi-cab.jpg?s=612x612&w=0&k=20&c=ubhNtUm-szjVlg7LJ3TeV36Pd27cuiRyA8n2z4oScOA=",
        ],
      },
    ],
  };