import { Episode } from "@types";
import axiosInstance from "./axiosInstance";

export const getRandomEpisode = async (
  params: URLSearchParams
): Promise<Episode> => {
  const response = await axiosInstance.get("/singleEpisode", {
    params,
  });
  return response.data;
};

export const getRandomEpisodes = async (
  params: URLSearchParams,
  count?: number
): Promise<Episode[]> => {
  const response = await axiosInstance.get(
    `/multipleEpisode${count ? `?count=${count}` : ""}`,
    { params }
  );
  return response.data;
};
