import { useQuery } from "@tanstack/react-query";
import * as publicAPI from "../api/public";

export const usePublicServices = () => {
  return useQuery(["publicServices"], publicAPI.fetchPublicServices, {
    staleTime: 1000 * 60, // cache for 1 min
  });
};

export const usePublicIncidents = () => {
  return useQuery(["publicIncidents"], publicAPI.fetchPublicIncidents, {
    staleTime: 1000 * 60,
  });
};

export const useTimeline = () => {
  return useQuery(["timeline"], publicAPI.fetchTimeline, {
    staleTime: 1000 * 60,
  });
};
