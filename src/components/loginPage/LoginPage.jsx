/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useRef, useState } from "react";
import show_image from "../assets/image/aboutImg1_1.webp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../store/userThunk";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import { setLoading, setUser } from "@/store/UserSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { token, loading: authLoading } = useSelector((state) => state.user);
  const { data: section } = useSession();
  const router = useRouter();
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const toastShown = useRef(false);

  // // ✅ ป้องกันการ flash ของหน้า login
  // const isLoading = status === "loading" || authLoading || !hasMounted;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsCursorVisible(false);
    }
  };

  useEffect(() => {
    if (section?.user && !toastShown.current) {
      toastShown.current = true;

      dispatch(setUser(section));

      if (section.user.role == "admin") {
        return (window.location.href = "/admin");
      }
      toast.success("Login successful 🎉", {
        position: "bottom-left",
        autoClose: 2000,
        pauseOnHover: false,
      });
      router.push("/food");
    }
  }, [section]);

  const handleFocus = () => {
    setIsCursorVisible(true);
  };

  const onSubmit = async (data) => {
    setIsCursorVisible(false);

    dispatch(setLoading());

    // แสดง loading ก่อน
    const toasId = toast.loading("Please wait...", { position: "bottom-left" });

    const result = await dispatch(checkUser(data));

    if (checkUser.fulfilled.match(result)) {
      if (result.payload.role == "admin") {
        toast.dismiss(toasId);
        return (window.location.href = "/admin");
      }
      toast.dismiss(toasId);
      toast.success("Login successful 🎉", {
        position: "bottom-left",
        autoClose: 2000,
        pauseOnHover: false,
      });
      router.push("/food");
    } else {
      const errorMessage = // * ใช้ result ที่ได้จาก dispatch โดยตรง ไม่ต้องไปดึง error จาก store
        result.payload?.message ||
        result.error?.message ||
        "Something went wrong";
      toast.dismiss(toasId);
      toast.error(`${errorMessage} ❌`, {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
        pauseOnHover: false,
      });
      reset();
    }
  };

  useEffect(() => {
    setHasMounted(true); // now we're on the client
  }, []);

  useEffect(() => {
    if (token) {
      return router.replace("/food/account");
    }
  }, [token]);

  useEffect(() => {
    const redirectFlag = localStorage.getItem("authRedirect");

    if (!redirectFlag) return;

    if (redirectFlag) {
      if (redirectFlag == "case1" || redirectFlag == "case3") {
        toast.error("Please login again ❌", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
          onClose: () => localStorage.removeItem("authRedirect"), // ลบออกหลังแสดง
        });
      } else if (redirectFlag == "case2") {
        toast.error("Unauthorized ❌", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
          onClose: () => localStorage.removeItem("authRedirect"), // ลบออกหลังแสดง
        });
      }
    }
  }, []);

  if (!hasMounted) return null; // ⚠️ Wait until client mounted

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-white">Loading...</p> {/* หรือใช้ spinner ก็ได้ */}
  //     </div>
  //   );
  // }

  return (
    <section>
      <div className="container-section py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-md overflow-hidden">
          <div className="relative">
            <div className="h-full">
              <Image
                className="h-full object-cover w-full"
                src={show_image}
                alt="Login Visual"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-blackBlue p-7 z-10">
            <div className="text-center text-white text-[25px]">
              <p
                className="text-[18px] sm:text-[20px] lg:text-[25px] text-yellow"
                style={{ fontFamily: "Pacifico" }}
              >
                Welcome Back
              </p>
              <h1 className="text-[30px] sm:text-[35px] lg:text-[40px] font-semibold">
                LOGIN
              </h1>
            </div>

            <form
              className="flex flex-col text-[14px] lg:text-[16px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none rounded-md"
                {...register("email")}
                type="email"
                placeholder="Email..."
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                required
                style={{
                  caretColor: isCursorVisible ? "black" : "transparent",
                }}
              />
              <input
                className="p-2 w-full my-6 focus:border-yellow border-[1px] border-solid focus:outline-none rounded-md"
                {...register("password")}
                type="password"
                placeholder="Password..."
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                required
                style={{
                  caretColor: isCursorVisible ? "black" : "transparent",
                }}
              />
              <button
                type="submit"
                className="p-3 bg-yellow text-white rounded-md"
                // disabled={loading}
              >
                Sign In
              </button>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-white border-solid" />
                <span className="text-white px-4">or</span>
                <hr className="flex-grow border-t border-white border-solid" />
              </div>

              <div className="flex mb-5">
                <GoogleLoginButton
                  style={{ borderRadius: "6px" }}
                  onClick={() => {
                    dispatch(setLoading());
                    signIn("google");
                  }}
                />
                <FacebookLoginButton style={{ borderRadius: "6px" }} />
              </div>

              <p className="text-white">
                Already have an account?{" "}
                <Link
                  href={"/food/signup"}
                  className="text-yellow cursor-pointer"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
