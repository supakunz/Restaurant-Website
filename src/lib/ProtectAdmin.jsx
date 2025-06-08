"use client";

/* eslint-disable react-hooks/exhaustive-deps */
// lib/withAdminAuth.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logOut, resetManualLogout } from "../store/UserSlice";
import { getUser } from "../store/userThunk";

export default function ProtectedAdminLayout({ children }) {
  const { token, user, manualLogout } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!manualLogout) {
      // เงื่อนไขตรวจสอบว่ากด logout เอง
      if (!token) {
        localStorage.setItem("authRedirect", "case1");
        return (window.location.href = "/food/login");
      }

      dispatch(getUser(token))
        .unwrap() // ใช้ unwrap กับ thunk เพื่อจัดการ error โดยตรง
        .then((res) => {
          if (res.data.role !== "admin") {
            localStorage.setItem("authRedirect", "case2");
            return (window.location.href = "/food/login");
          }
        })
        .catch(() => {
          dispatch(logOut());
          localStorage.setItem("authRedirect", "case3");
          return (window.location.href = "/food/login");
        });
    }

    // reset manualLogout เพื่อให้ไม่ส่งผลต่อการ login/logout ครั้งถัดไป
    if (manualLogout) {
      dispatch(resetManualLogout());
    }
  }, [token]);

  if (!token || user?.data.role !== "admin")
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return children;
}
