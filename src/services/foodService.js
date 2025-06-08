// services/productService.js
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllfoods = async (reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.get(`${baseURL}/api/foods/getallfoods`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addfoods = async (data, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.post(`${baseURL}/api/foods/addfood`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFoodID = async (id, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.get(`${baseURL}/api/foods/getfood/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateFoodID = async (id, data, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.put(`${baseURL}/api/foods/updatefood/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeFoodID = async (id, reduxtoken) => {
  const token = reduxtoken || localStorage.getItem("token");
  return await axios.delete(`${baseURL}/api/foods/deletefood/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
