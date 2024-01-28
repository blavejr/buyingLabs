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

    // Generate a random availability date range or false
    const availability =
      Math.random() >= 0.5
        ? generateRandomDateRange()
        : false;

    hotelData.push({
      name: `Hotel ${i}`,
      city: randomLocation.city,
      country: randomLocation.country,
      availability,
      price: generateRandomNumber(50, 500),
      photos: [
        `https://via.placeholder.com/150?text=Image+${i * 3 - 2}`,
        `https://via.placeholder.com/150?text=Image+${i * 3 - 1}`,
        `https://via.placeholder.com/150?text=Image+${i * 3}`,
      ],
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return hotelData;
}

function generateRandomDateRange(): { start: Date; end: Date } {
  const startDate = new Date();

  // Random start date within the next month
  startDate.setDate(startDate.getDate() + generateRandomNumber(1, 30));

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + generateRandomNumber(1, 90)); 

  return { start: startDate, end: endDate };
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}