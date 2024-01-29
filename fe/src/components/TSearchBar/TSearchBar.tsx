import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./TSearchBar.module.scss";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ISearchData } from "../../types";

interface TSearchBarProps {
  setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  searchData: ISearchData;
}

const DATE_FORMAT = "YYYY-mm-dd";

export default function TSearchBar({
  setSearchData,
  setPage,
  setErrorMessage,
  searchData,
}: TSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(searchData.startDate);
  const [endDate, setEndDate] = useState(searchData.endDate);
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNumberOfPeople(event.target.value);
  };

  useEffect(() => {
    if (moment(startDate).isAfter(endDate)) {
      setErrorMessage("Start date cannot be after end date");
      return;
    }

    if (searchTerm) {
      setPage(1);
    }

    // All this data can be sent to the backend, validated and used to query the db
    // For this example we only query the db with the search term
    setSearchData({
      searchTerm,
      startDate,
      endDate,
      numberOfPeople,
    });

    setErrorMessage("");
  }, [searchTerm, startDate, endDate, numberOfPeople]);

  return (
    <div className={cx(styles.searchContainer)}>
      <input
        className={cx(styles.searchInput)}
        type="text"
        placeholder="What is your destination?"
        aria-label="Destination"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setPage(1);
        }}
      />
      <label htmlFor="startDate">Start Date:</label>
      <DatePicker
        id="startDate"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat={DATE_FORMAT}
        aria-label="Start Date"
      />
      <label htmlFor="endDate">End Date:</label>
      <DatePicker
        id="endDate"
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        dateFormat={DATE_FORMAT}
        aria-label="End Date"
      />
      <div>
        <label htmlFor="dropdown">Number of guests:</label>
        <select
          id="dropdown"
          value={numberOfPeople}
          onChange={handleSelectChange}
        >
          {/* This can come from the hotel info from the db */}
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
