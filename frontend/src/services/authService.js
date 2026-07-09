import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:8081";

export const register = async (username, email, password) => {
  const response = await axios.post(
    `${BASE_URL}/auth/register`,
    {
      username,
      email,
      password,
    }
  );

  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/auth/login`,
    {
      email,
      password,
    }
  );

  const token = response.data;

  localStorage.setItem("token", token);

  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") != null;
};