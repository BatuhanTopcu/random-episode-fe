import { Show } from "@types";
import axiosInstance from "./axiosInstance";

export const apiSearch = async (query: string): Promise<Show[]> => {
  const response = await axiosInstance.get(`/search?text=${query}`);
  return response.data.results;
};
