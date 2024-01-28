import { ISearchData } from "../types";
import moment from "moment";

export const initSearchData: ISearchData = {
  searchTerm: "",
  startDate: moment().toDate(),
  endDate: moment().add(30, "days").toDate(),
  numberOfPeople: "1",
};
