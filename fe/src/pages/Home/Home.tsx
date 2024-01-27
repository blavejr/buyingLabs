import React, { useCallback, useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import hotelAPI from "../../api/hotel";
import { useNavigate } from "react-router-dom";
import loading from "../../loading.jpg";
import cx from "classnames";
import styles from "./Home.module.scss";
import { IHotel, IHotelResponse } from "../../types";
import { hotelResponse } from "../../utils/state";
import TSearchBar from "../../components/TSearchBar/TSearchBar";

const Home: React.FC = () => {
  const [responseData, setResponseData] =
    React.useState<IHotelResponse>(hotelResponse);
  const [hotels, setHotels] = React.useState<IHotel[]>([]);
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
    hotelAPI.gethotels(page, 3, searchTerm).then((response: IHotelResponse) => {
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
        <TSearchBar setSearchTerm={setSearchTerm} setPage={setPage} />
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
