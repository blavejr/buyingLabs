import React, { useEffect, useRef, useState } from "react";
import hotelAPI from "../../api/hotel";
import cx from "classnames";
import styles from "./Home.module.scss";
import { IHotelResponse } from "../../types";
import TSearchBar from "../../components/TSearchBar/TSearchBar";
import THotelList from "../../components/THotelList/THotelList";
import { useHotelContext } from "../../context";
import { initSearchData } from "../../utils/state";

const PAGE_SIZE = 10;

const Home: React.FC = () => {
  const {
    page,
    errorMessage,
    isLoading,
    setHotels,
    setIsLoading,
    setTotalPages,
    setErrorMessage,
  } = useHotelContext();

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    hotelAPI
      .gethotels({ page, count: PAGE_SIZE, ...initSearchData })
      .then((response: IHotelResponse & { message: string }) => {
        if (response.success === false) {
          setErrorMessage(response.message);
          return;          
        }
        setTotalPages(response.totalPages!);
        setHotels(response.data!);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <header className={cx(styles.header)}>
        <h1>Welcome to Travolta Hotels</h1>
        <TSearchBar />
        {errorMessage && <p className={styles.errorMessage}>ERROR: {errorMessage}</p>}
      </header>
      {isLoading && (
        <div className={cx(styles.loadinggif)}>
          <img src={"https://i.pinimg.com/originals/57/e2/09/57e209296e586933febadf06e271a3d3.gif"} alt="loading..." />
        </div>
      )}
      <THotelList />
    </div>
  );
};

export default Home;
