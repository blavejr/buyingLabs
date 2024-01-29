import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import cx from "classnames";
import styles from "./THotelList.module.scss";
import moment from "moment";
import { useHotelContext } from "../../context";
import { loadHotels } from "../../utils/loadHotels";
import hotelAPI from "../../api/hotel";
import { PAGE_SIZE } from "../../utils/constants";


export default function THotelList() {
  const { hotels, page, totalPages, searchData, setPage, setHotels, setIsLoading } = useHotelContext();
  const lastElementRef = useRef<HTMLDivElement>(null);
  
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
    }, [hotels]);
  
    // Load more hotels when the last element is visible
    function onIntersect(entries: any) {
      const target = entries[0];
      if (target.isIntersecting) {
        loadHotels(
          page,
          PAGE_SIZE,
          totalPages as number,
          searchData,
          setPage,
          setHotels,
          setIsLoading,
          hotelAPI
        );
      }
    }

  return (
    <div className={cx(styles.hotelListContainer)}>
      {hotels?.map((hotel: any, _index: number) => (
        <div
          // add ref to last element
          key={`hotel-${_index}`}
          ref={hotels?.length === _index + 1 ? lastElementRef : null}
          className={cx(styles.hotelListItem)}
        >
          <div className={cx(styles.hotelInfo)}>
            <h3 className={cx(styles.hotelName)}>Name: {hotel.name}</h3>
            <p className={cx(styles.hotelCity)}>City: {hotel.city}</p>
            <p className={cx(styles.hotelCountry)}>Country: {hotel.country}</p>
            <div>
              Availability:{" "}
              {hotel.availability === false ? (
                "Not Available"
              ) : (
                <p>
                  {moment(hotel.availability.start).format("DD/MM/YYYY")} -{" "}
                  {moment(hotel.availability.end).format("DD/MM/YYYY")}
                </p>
              )}
            </div>
            <p className={cx(styles.price)}>Price: {hotel.price} eur</p>
          </div>

          {hotel.photos &&
            hotel.photos.map((photo: string, _img_index: number) => (
              <img key={`hotel-${_index}-img-${_img_index}`} className={cx(styles.hotelImage)} src={photo} alt="hotel" />
            ))}
        </div>
      ))}
    </div>
  );
}
