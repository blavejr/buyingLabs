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
  },
];

export default function generateDummyHotelData(count: number) {
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
}
