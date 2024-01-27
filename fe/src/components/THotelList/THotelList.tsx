import React from 'react'
import cx from "classnames";
import styles from "./THotelList.module.scss";
import { IHotel } from '../../types';

export default function THotelList({
    hotels,
    lastElementRef,
    }: {
    hotels: IHotel[];
    lastElementRef: React.RefObject<HTMLDivElement>;
}) {
  return (
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
  )
}
