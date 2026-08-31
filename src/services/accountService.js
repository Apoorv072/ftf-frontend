import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createAccount = async (accountType, currency) => {
  const token = localStorage.getItem("token");

  const decodedToken = jwtDecode(token);
  const userId = Number(decodedToken.sub);

  const response = await axios.post(
    "http://localhost:8080/api/v1/accounts",
    {
      userId,
      accountType,
      currency
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};