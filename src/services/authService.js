import axios from "axios";

export const login = async (email, password) => {

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        {
            email,
            password
        }
    );

    return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/users/signup",
    userData
  );

  return response.data;
};

