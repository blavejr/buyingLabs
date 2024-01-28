import React, { useEffect, useRef, useState } from "react";
import hotelAPI from "../../api/hotel";
import cx from "classnames";
import styles from "./Home.module.scss";
import { IHotel, IHotelResponse, ISearchData } from "../../types";
import { initSearchData } from "../../utils/state";
import TSearchBar from "../../components/TSearchBar/TSearchBar";
import THotelList from "../../components/THotelList/THotelList";
import { loadHotels } from "../../utils/loadHotels";

const PAGE_SIZE = 3;

const Home: React.FC = () => {
  // I will use normal state as this is a small app and I don't need to use Redux or Context API
  const [totalPages, setTotalPages] =
    React.useState<number>(0);
  const [hotels, setHotels] = React.useState<IHotel[]>([]);
  const [page, setPage] = useState(1);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [searchData, setSearchData] = useState<ISearchData>(initSearchData);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Initial load
  useEffect(() => {
    hotelAPI
      .gethotels(page, PAGE_SIZE, searchData?.searchTerm)
      .then((response: IHotelResponse) => {
        setTotalPages(response.totalPages);
        setHotels(response.data);
      });
  }, [searchData?.searchTerm]);

  // Infinite scroll
  useEffect(() => {
    // create an observer to watch the last element
    const observer = new IntersectionObserver(onIntersect);
    // if the last element exists, start observing it
    if (observer && lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      // stop observing the last element
      if (observer && lastElementRef.current) {
        observer.disconnect();
      }
    };
  }, [hotels, searchData?.searchTerm]);

  // Load more hotels when the last element is visible
  function onIntersect(entries: any) {
    const target = entries[0];
    if (target.isIntersecting) {
      loadHotels(
        page,
        PAGE_SIZE,
        totalPages,
        searchData?.searchTerm,
        setPage,
        setHotels,
        hotelAPI
      );
    }
  }

  return (
    <div>
      <header className={cx(styles.header)}>
        <h1>Welcome to Travolta Hotels</h1>
        <TSearchBar
          setSearchData={setSearchData}
          setPage={setPage}
          setErrorMessage={setErrorMessage}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </header>
      <THotelList hotels={hotels} lastElementRef={lastElementRef} />
    </div>
  );
};

export default Home;
