// services/productService.js
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (data) => {
  return await axios.post(`${baseURL}/api/users/register`, data);
};

export const getAlluser = async (reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.get(`${baseURL}/api/users/alluser`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserID = async (id, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.get(`${baseURL}/api/users/userid/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUserID = async (id, data, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.put(`${baseURL}/api/users/userid/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeUserID = async (id, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.delete(`${baseURL}/api/users/userid/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
