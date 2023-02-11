import { useState } from "react";
import { LoginCredentials } from "@customTypes/api.types";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { signIn as apiSignIn } from "../../services/auth-api.service";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@lib/api/routes";

export const useAuth = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const signIn = async (data: LoginCredentials) => {
    try {
      setAuthError(null);
      await apiSignIn(data);
      await router.push("/constructor");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setAuthError(error.response?.data?.detail);
      }
    }
  };

  const signOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    await queryClient.removeQueries([apiRoutes.users.me, null]);
    await router.reload();
  };

  return { signIn, authError, signOut };
};
