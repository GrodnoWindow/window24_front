import { apiRoutes } from "@lib/api/routes";
import { useFetch } from "@lib/api/api";
import { User } from "@customTypes/api.types";

export const useUser = () => {
  return useFetch<User>(apiRoutes.users.me, undefined, {
    retry: false,
  });
};
