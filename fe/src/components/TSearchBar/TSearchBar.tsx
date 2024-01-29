import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./TSearchBar.module.scss";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useHotelContext } from "../../context";
import { DATE_FORMAT } from "../../utils/constants";
import hotelAPI from "../../api/hotel";


export default function TSearchBar() {
  const { searchData, setSearchData, setErrorMessage, setPage, setHotels, setIsLoading, setTotalPages } = useHotelContext();
  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchData({
      ...searchData,
      numberOfPeople: String(event.target.value),
    });
  };

  useEffect(() => {
    if (moment(searchData.startDate).isAfter(searchData.endDate)) {
      setErrorMessage("Start date cannot be after end date");
      return;
    }

    // If the search term changes, reset the page to 1
    if (searchData.searchTerm) {
      setPage(1);
    }

    // Reset the error message
    setErrorMessage("");

    // Make a call to the API with the new search data
    setIsLoading(true);
    hotelAPI.gethotels({ page: 1, count: 10, ...searchData }).then((response) => {
      setTotalPages(response.totalPages!);
      setHotels(response.data!);
      setIsLoading(false);
    }
    );
  }, [searchData]);

  return (
    <div className={cx(styles.searchContainer)}>
      <input
        className={cx(styles.searchInput)}
        type="text"
        placeholder="What is your destination?"
        aria-label="Destination"
        onChange={(event) => {
          setSearchData({
            ...searchData,
            searchTerm: event.target.value,
          });
          setPage(1);
        }}
      />
      <label htmlFor="startDate">Start Date:</label>
      <DatePicker
        id="startDate"
        selected={searchData.startDate}
        onChange={(date: Date) => setSearchData({ ...searchData, startDate: date })}
        dateFormat={DATE_FORMAT}
        aria-label="Start Date"
      />
      <label htmlFor="endDate">End Date:</label>
      <DatePicker
        id="endDate"
        selected={searchData.endDate}
        onChange={(date: Date) => setSearchData({ ...searchData, endDate: date })}
        dateFormat={DATE_FORMAT}
        aria-label="End Date"
      />
      <div>
        <label htmlFor="dropdown">Number of guests:</label>
        <select
          id="dropdown"
          value={searchData.numberOfPeople}
          onChange={handleSelectChange}
        >
          {/* This can come from the hotel info from the db */}
          {[...Array(10)].map((_, i) => (
            <option key={`option-${i}`} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
