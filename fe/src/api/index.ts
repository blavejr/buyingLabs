import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const get = async (url: string, options: any = null): Promise<any> => {
  const response: AxiosResponse = await api.get(url, options);
  return response;
};

export const post = async (url: string, data: any): Promise<any> => {
  const response: AxiosResponse = await api.post(url, data);
  return response;
};

export const put = async (url: string, data: any): Promise<any> => {
  const response: AxiosResponse = await api.put(url, data);
  return response;
};

export const remove = async (url: string): Promise<any> => {
  const response: AxiosResponse = await api.delete(url);
  return response;
};

export const patch = async (url: string, data: any): Promise<any> => {
  const response: AxiosResponse = await api.patch(url, data);
  return response;
};

export default {
  get,
  post,
  put,
  remove,
  patch,
};
