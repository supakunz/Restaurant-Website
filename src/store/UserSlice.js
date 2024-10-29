import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const URL = process.env.NEXT_PUBLIC_API_URL

// Create user
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userdata) => {
    const req = await axios.post(`${URL}/api/register`, userdata)
    const response = await req.data
    return response;
  }
)

//Login user
export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (userdata) => {
    const req = await axios.post(`${URL}/api/login`, userdata) // checkdata login ต้องส่ง data 
    const response = req.data
    // const token = response.token
    // localStorage.setItem('token', token)
    return response
  }
)

//Get DataUser
export const getUser = createAsyncThunk(
  'user/getUser',
  async (token) => {
    const req = await axios.get(`${URL}/api/users`, { headers: { "Authorization": `Bearer ${token}` } })
    const response = req.data
    return response
  }
)

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('cart')
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          if (action.type.includes("checkUser") || action.type.includes("createUser")) {
            toast.loading('Please wait...', { position: "bottom-left" })
          }
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          toast.dismiss();
          if (action.type.includes("createUser")) {
            state.user = action.payload
            // console.log(current(state))
          }
          if (action.type.includes("checkUser")) {
            toast.success('Login successful', {
              position: "bottom-left",
              autoClose: 2000,
              pauseOnHover: false,
            })
            state.token = action.payload.token
            localStorage.setItem('token', state.token)
          }
          if (action.type.includes("getUser")) {
            if (state.token == null) {
              state.token = localStorage.getItem('token')
            }
            state.user = action.payload
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message
          if (action.error.message === "Request failed with status code 401") {
            toast.dismiss();
            toast.error('Invalid email Please try again.', {
              position: "bottom-left",
              autoClose: 2000,
              theme: "colored",
              pauseOnHover: false,
            })
            state.error = 'Invalid email Please try again.'
          }
          if (action.error.message === "Request failed with status code 400") {
            toast.dismiss();
            toast.error('Invalid password Please try again.', {
              position: "bottom-left",
              autoClose: 2000,
              theme: "colored",
              pauseOnHover: false,
            })
            state.error = 'Invalid password Please try again.'
          }
        }
      )
  }
})

export const { logOut } = UserSlice.actions;

export default UserSlice.reducer;