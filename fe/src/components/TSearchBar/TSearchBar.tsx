import React from 'react'
import cx from "classnames";
import styles from "./TSearchBar.module.scss";

export default function TSearchBar({
  setSearchTerm,
  setPage,
}: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
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
  )
}
