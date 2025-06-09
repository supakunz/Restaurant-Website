// features/user/userThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ดึง API URL จาก .env
const URL = process.env.NEXT_PUBLIC_API_URL;

// 🎯 Register ผู้ใช้ใหม่
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/api/users/register`, userdata); // ส่งข้อมูลไปที่ backend
      return res.data; // ส่งผลลัพธ์ไปที่ reducer (state)
    } catch (err) {
      // หาก error ให้ส่งค่า error กลับไปให้ reducer ด้วย rejectWithValue
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🎯 Login ผู้ใช้
export const checkUser = createAsyncThunk(
  "user/checkUser",
  async (userdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/api/users/login`, userdata); // ส่ง email/password ไปเช็ค
      return res.data; // ถ้า login สำเร็จ จะได้ token กลับมา
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message); // ถ้า error ก็จัดการส่งกลับ
    }
  }
);

// 🎯 ดึงข้อมูลผู้ใช้ (หลัง login แล้ว)
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      // ดึง token จาก state หรือ localStorage
      const token = getState().user.token || localStorage.getItem("token");

      const res = await axios.get(`${URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }, // แนบ token เพื่อให้ backend รู้ว่า login แล้ว
      });
      return res.data; // ดึงข้อมูลผู้ใช้จาก token
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message); // ส่ง error กลับ
    }
  }
);
