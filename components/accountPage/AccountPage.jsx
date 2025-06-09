/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import logo_image from "../assets/image/logov3.png";
import member_image from "../assets/image/memberSection.jpg";

import { logOut, resetManualLogout } from "../../store/UserSlice";
import { getUser } from "../../store/userThunk";

const AccountPage = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { token, manualLogout, user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    dispatch(logOut());
    await signOut({ redirect: false }); // ⛔️ ป้องกัน redirect ซ้อน
    toast.success("Logout successful 🎉", {
      position: "bottom-left",
      autoClose: 2000,
      pauseOnHover: false,
    });
    route.replace("/food");
  };

  useEffect(() => {
    if (manualLogout) {
      dispatch(resetManualLogout()); // ✅ เคลียร์ state กลับ
      return; // ⛔️ หยุดไม่ให้ตรวจ token ต่อ
    }

    if (!token) {
      toast.error("Please login again ❌", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
        pauseOnHover: false,
      });
      return router.replace("/food/login");
    }

    dispatch(getUser(token))
      .unwrap()
      .then((res) => setUserData(res.data))
      .catch(() => {
        dispatch(logOut());
        toast.error("Failed to fetch user data ❌", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
        router.replace("/food/login");
      });
  }, [token]);

  return (
    <section>
      <div className="container-section py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-[35%_62%] gap-10 text-[14px] sm:text-[15px] lg:text-[16px]">
          <div className="bg-blackBlue p-[33px_25px] rounded-md">
            <div className="flex justify-center">
              <Image className="max-w-[180px]" src={logo_image} alt="" />
            </div>
            <div className="text-white flex flex-col gap-2 mb-8 my-6">
              <div className="flex justify-between">
                <span>ID :</span>
                <span>{userData?.id || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Firstname :</span>
                <span>{userData?.firstname || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Lastname :</span>
                <span>{userData?.lastname || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Email :</span>
                <span>{userData?.email || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone :</span>
                <span>{userData?.phone || "-"}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-[0.7rem] bg-[#ff8080] rounded-md w-full hover:bg-[#f89090]"
            >
              Logout
            </button>
          </div>

          <div className='rounded-md flex items-center justify-center p-10 relative overflow-hidden before:content-[""] before:absolute before:bg-[#000000b3] before:z-[-9] before:w-full before:h-screen'>
            <Image
              className="absolute z-[-10] top-0 w-full h-full object-cover"
              src={member_image}
              alt=""
            />
            <div className="text-center flex flex-col justify-center items-center gap-7">
              <h1 className="text-[22px] sm:text-[28px] lg:text-[30px] text-white font-semibold">
                want to join monthly member to receive special privileges
              </h1>
              <Link
                href={"/food/membership"}
                onClick={() => window.scrollTo(0, 0)}
                className="bg-yellow p-[10px] w-[200px] rounded-md hover:bg-yellowHover"
              >
                Go to membership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
