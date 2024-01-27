import { Types } from "mongoose";

interface Hotel {
  name: string;
  city: string;
  country: string;
  availability: boolean;
  price: number;
  photos: string[];
  [key: string]: any;
}

interface APIResponseType {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  data: Hotel[];
}

const generateDummyHotelData = (count: number) => {
  const hotelData = [];
  for (let i = 1; i <= count; i++) {
    const randomLocation =
      possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
    hotelData.push({
      name: `Hotel ${i}`,
      city: randomLocation.city,
      country: randomLocation.country,
      availability: Math.random() >= 0.5,
      price: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
      photos: [
        `https://via.placeholder.com/150?text=Image+${i * 3 - 2}`,
        `https://via.placeholder.com/150?text=Image+${i * 3 - 1}`,
        `https://via.placeholder.com/150?text=Image+${i * 3}`,
      ],
    });
  }
  return hotelData;
};

const possibleLocations = [
  {
    city: "Windhoek",
    country: "Namibia",
  },
  {
    city: "Kiev",
    country: "Ukraine",
  },
  {
    city: "London",
    country: "United Kingdom",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
  },
  {
    city: "Berlin",
    country: "Germany",
  },
  {
    city: "Helsinki",
    country: "Finland",
  },
  {
    city: "Dublin",
    country: "Ireland",
  },
  {
    city: "Vancouver",
    country: "Canada",
  },
  {
    city: "Barcelona",
    country: "Spain",
  },
  {
    city: "Lisbon",
    country: "Portugal",
  }
];

const dummyHotelData: Hotel[] = [
  {
    name: "Hotel number one",
    city: "City One",
    country: "Country One",
    availability: true,
    price: 100,
    photos: [
      "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
      "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
      "https://media.istockphoto.com/id/472899538/de/foto/eingang-von-hotel-in-der-innenstadt-von-cleveland-und-warten-taxi-cab.jpg?s=612x612&w=0&k=20&c=ubhNtUm-szjVlg7LJ3TeV36Pd27cuiRyA8n2z4oScOA=",
    ],
  },
  ...generateDummyHotelData(10000),
  {
    name: "Hotel number last",
    city: "City last",
    country: "Country last",
    availability: true,
    price: 100,
    photos: [
      "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
      "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
      "https://media.istockphoto.com/id/472899538/de/foto/eingang-von-hotel-in-der-innenstadt-von-cleveland-und-warten-taxi-cab.jpg?s=612x612&w=0&k=20&c=ubhNtUm-szjVlg7LJ3TeV36Pd27cuiRyA8n2z4oScOA=",
    ],
  },
];

export function gethotels(
  currentPage: number = 1,
  itemsPerPage: number = 4,
  searchTerm: string = ""
): APIResponseType {
  const lowerCaseSearch = searchTerm.toLowerCase();
  const searchRes: Hotel[] = dummyHotelData.filter((hotel) => {
    const lowerCaseCity = hotel.city.toLowerCase();
    const lowerCaseCountry = hotel.country.toLowerCase();

    if (
      lowerCaseCity.includes(lowerCaseSearch) ||
      lowerCaseCountry.includes(lowerCaseSearch)
    ) {
      return hotel;
    }
  });
  return paginate(searchRes, currentPage, itemsPerPage);
}

// This can be in utils as multiple components can use it
function paginate(
  dataArray: Hotel[],
  currentPage: number,
  itemsPerPage: number
) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = dataArray.slice(startIndex, endIndex);
  console.log(paginatedData);

  return {
    currentPage,
    itemsPerPage,
    totalItems: dataArray.length,
    totalPages: Math.ceil(dataArray.length / itemsPerPage),
    data: paginatedData,
  };
}
