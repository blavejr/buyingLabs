import React, { useCallback, useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import hotelAPI from "../../api/hotel";
import { useNavigate } from "react-router-dom";
import loading from "../../loading.jpg";
import cx from "classnames";
import styles from "./Home.module.scss";

interface Hotel {
  name: string;
  city: string;
  country: string;
  // No need to return this from the backend, simply dont return the hotel if it's not available
  availability: boolean;
  price: number;
  photos?: string[];
}

interface HotelResponse {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  data: Hotel[];
}

const loadingData: HotelResponse = {
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

const Home: React.FC = () => {
  const [responseData, setResponseData] =
    React.useState<HotelResponse>(loadingData);
  const [hotels, setHotels] = React.useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  function onIntersect(entries: any) {
    const target = entries[0];
    if (target.isIntersecting) {
      loadHotels();
    }
  }

  // Initial load
  useEffect(() => {
    hotelAPI.gethotels(page, 3, searchTerm).then((response: HotelResponse) => {
      setResponseData(response);
      setHotels(response.data);
    });
  }, [searchTerm]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect);
    if (observer && lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (observer && lastElementRef.current) {
        observer.disconnect();
      }
    };
  }, [hotels, searchTerm]);

  const loadHotels = async () => {
    if (page <= responseData.totalPages) {
      setPage((prevPage) => prevPage + 1);
      try {
        const response = await hotelAPI.gethotels(page, 3, searchTerm);
        setHotels((prevHotels) => [...prevHotels, ...response.data]);
      } catch (error) {
        console.error("Error loading more hotels:", error);
      } finally {
        console.log("finally");
        // setLoading(false);
      }
    }
  };

  return (
    <div>
      <header className={cx(styles.header)}>
        <div>
          <h1>Welcome to Travolta Hotels</h1>
        </div>
        <div className={cx(styles.searchContainer)}>
          <input
            className={cx(styles.searchInput)}
            type="text"
            placeholder="What is your destination?"
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
          />
          <input type="text" placeholder="date..." />
          <input type="text" placeholder="date..." />
          <input type="text" placeholder="number of people..." />
        </div>
        {/* <div>Hotels count: {hotels?.length}</div>
        <div>Page count: {page}</div> */}
      </header>
      <div className={cx(styles.hotelListContainer)}>
        {hotels?.map((hotel: any, _index: number) => (
          <div
            // add ref to last element
            ref={hotels?.length === _index + 1 ? lastElementRef : null}
            className={cx(styles.hotelListItem)}
          >
            <div className={cx(styles.hotelInfo)}>
              <h3 className={cx(styles.hotelName)}>Name: {hotel.name}</h3>
              <p className={cx(styles.hotelCity)}>City: {hotel.city}</p>
              <p className={cx(styles.hotelCountry)}>
                Country: {hotel.country}
              </p>
              <p className={cx(styles.price)}>Price: {hotel.price} eur</p>
            </div>

            {hotel.photos &&
              hotel.photos.map((photo: string) => (
                <img
                  className={cx(styles.hotelImage)}
                  src={photo}
                  alt="hotel"
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
