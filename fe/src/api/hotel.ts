import api from "./index";

const gethotels = async (page: number = 1, count: number = 1, searchTerm: string = "") => {
  const response = await api.get(`hotel?page=${page}&count=${count}&term=${searchTerm}`);
  return response.data;
}

const hotelAPI = {
    gethotels,
};

export default hotelAPI;
