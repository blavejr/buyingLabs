import React, { useEffect, useRef, useState } from "react";
import hotelAPI from "../../api/hotel";
import loading from "../../loading.jpg";
import cx from "classnames";
import styles from "./Home.module.scss";
import { IHotel, IHotelResponse } from "../../types";
import { hotelResponse } from "../../utils/state";
import TSearchBar from "../../components/TSearchBar/TSearchBar";
import THotelList from "../../components/THotelList/THotelList";

const Home: React.FC = () => {
  const [responseData, setResponseData] =
    React.useState<IHotelResponse>(hotelResponse);
  const [hotels, setHotels] = React.useState<IHotel[]>([]);
  const [page, setPage] = useState(1);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  function onIntersect(entries: any) {
    const target = entries[0];
    if (target.isIntersecting) {
      loadHotels();
    }
  }

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
        <h1>Welcome to Travolta Hotels</h1>
        <TSearchBar setSearchTerm={setSearchTerm} setPage={setPage} />
      </header>
      <THotelList hotels={hotels} lastElementRef={lastElementRef} />
    </div>
  );
};

export default Home;
