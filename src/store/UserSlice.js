import { createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, getUser } from "./userThunk";

// 👇 State เริ่มต้น
const initialState = {
  user: null, // ข้อมูลผู้ใช้ (หลัง login แล้ว)
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null, // token ที่เก็บไว้
  loading: false, // สถานะการโหลด (ใช้โชว์ spinner ได้)
  error: null, // เก็บข้อความ error
  manualLogout: false,
};

// 🎯 ตัวหลัก: สร้าง Slice สำหรับจัดการ user state
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 📌 Log out ผู้ใช้
    logOut: (state) => {
      state.manualLogout = true;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token"); // ล้าง token
      localStorage.removeItem("cart"); // ล้างตะกร้า (ถ้ามี)
    },
    // 📌 Reset ค่า manualLogout
    resetManualLogout: (state) => {
      state.manualLogout = false;
    },

    // ✅ Socail Login
    setUser: (state, action) => {
      state.token = action.payload.accessToken; // บันทึก token
      localStorage.setItem("token", action.payload.accessToken); // เก็บ token ไว้ใช้ทีหลัง
      state.loading = false;
    },

    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder // (* addCase ต้องมาก่อน addMatcher)
      // ✅ Register สำเร็จ
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // บันทึกข้อมูลผู้ใช้ที่เพิ่งสมัคร
      })

      // ✅ Login สำเร็จ
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // บันทึก token
        localStorage.setItem("token", action.payload.token); // เก็บ token ไว้ใช้ทีหลัง
      })

      // ✅ ดึงข้อมูลผู้ใช้สำเร็จ
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // บันทึกข้อมูลผู้ใช้
      })

      // ⚙️ กำหนดเมื่อ asyncThunk เริ่มทำงาน
      .addMatcher(
        (a) => a.type.endsWith("/pending"),
        (state) => {
          state.loading = true; // แสดง loading
          state.error = null; // เคลียร์ error เดิม
        }
      )

      // ❌ ถ้าเกิด error จากทุก asyncThunk
      .addMatcher(
        (a) => a.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong"; // บันทึกข้อความ error
        }
      );
  },
});

// 👉 Export action และ reducer
export const { logOut, resetManualLogout, setUser, setLoading } =
  userSlice.actions;
export default userSlice.reducer;
