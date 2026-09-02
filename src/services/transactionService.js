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

export const getTransactionsByAccountNumber = async (accountNumber) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:8080/api/v1/transactions/history/${accountNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};