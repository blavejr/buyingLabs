import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { IHotel, ISearchData } from "../types";
import { initSearchData } from "../utils/state";

interface HotelContextProps {
  hotels: IHotel[] | undefined;
  setHotels: Dispatch<SetStateAction<IHotel[]>>;
  searchData: ISearchData;
  setSearchData: Dispatch<SetStateAction<ISearchData>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  totalPages: number | undefined;
  setTotalPages: Dispatch<SetStateAction<number>>;
}

export const HotelContext = createContext<HotelContextProps | undefined>(
  undefined
);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [searchData, setSearchData] = useState<ISearchData>(initSearchData);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        setHotels,
        searchData,
        setSearchData,
        page,
        setPage,
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
        totalPages,
        setTotalPages
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};
