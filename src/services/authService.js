import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.username,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const recoverPassword = async (email) => {
try {
    const response = await axios.post("http://localhost:8080/api/v1/login/reset/token", {
    email,
    });
    return response.data;
} catch (error) {
    throw error;
}
};

export const resetPassword = async (email, token, newPassword) => {
try {
    const response = await axios.post("http://localhost:8080/api/v1/login/reset", {
    email,
    token,
    newPassword,
    });
    return response.data;
} catch (error) {
    throw error;
}
};