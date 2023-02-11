import { apiRoutes } from "@lib/api/routes";
import { useFetch } from "@lib/api/api";
import { Call } from "@customTypes/api.types";

export const useCalls = () => {
  return useFetch<Array<Call>>(apiRoutes.calls.all, undefined);
};
