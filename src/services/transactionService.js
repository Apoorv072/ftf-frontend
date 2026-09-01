import axios from "axios";

export const createTransaction = async (transaction) => {
  const token = localStorage.getItem("token");

  const idempotencyKey = crypto.randomUUID();

  const response = await axios.post(
    "http://localhost:8080/api/v1/transactions",
    transaction,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Idempotency-Key": idempotencyKey
      }
    }
  );

  return response.data;
};

