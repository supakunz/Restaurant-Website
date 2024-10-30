/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import show_image from "../assets/image/aboutImg1_1.webp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../store/UserSlice";
import Image from "next/image";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    dispatch(checkUser(data));
  };

  useEffect(() => {
    if (token) {
      router.push("/");
    } else if (error) {
      reset();
    }
  }, [token, error]);

  return (
    <section>
      <div className="container-section py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <div class="h-full">
              <Image
                className="h-full object-cover w-full"
                src={show_image}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-blackBlue p-7 z-10">
            <div className="text-center text-white text-[25px]">
              <p
                className="text-[18px] sm:text-[20px] lg:text-[25px] text-yellow text"
                style={{ fontFamily: "Pacifico" }}
              >
                Register
              </p>
              <h1 className="text-[30px] sm:text-[35px] lg:text-[40px] font-semibold">
                LOGIN
              </h1>
            </div>
            <form
              className="flex flex-col gap-6 text-[14px] lg:text-[16px]"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none"
                {...register("email")}
                type="email"
                name="email"
                placeholder="Email..."
                required
              />
              <input
                className="p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none"
                type="password"
                {...register("password")}
                name="password"
                placeholder="password..."
                required
              />
              <button type="submit" className="p-3 bg-yellow text-white">
                Sing Up
              </button>
              <p className="text-white">
                Already have an account?{" "}
                <Link href={"/singup"} className="text-yellow cursor-pointer">
                  Login here
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
