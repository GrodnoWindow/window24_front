import { apiRoutes } from "@lib/api/routes";
import { api } from "@lib/api/api";
import { LoginCredentials, TokenPayload } from "@customTypes/api.types";

const setTokens = (tokens: TokenPayload) => {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
};

export const refreshAccessToken = async () => {
  const refreshTokenFromLocalStorage = localStorage.getItem("refreshToken");
  if (!refreshTokenFromLocalStorage) return null;

  const response = await api.post<TokenPayload>(apiRoutes.auth.refresh, {
    refresh: refreshTokenFromLocalStorage,
  });

  const { access } = response.data;
  setTokens(response.data);

  return access;
};

export const signIn = async (data: LoginCredentials) => {
  const response = await api.post<TokenPayload>(apiRoutes.auth.login, data);
  setTokens(response.data);
};
