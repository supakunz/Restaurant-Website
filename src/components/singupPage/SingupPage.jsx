"use client";

import show_image from "../assets/image/aboutImg1_4.webp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/UserSlice";
import { toast } from "react-toastify";
import Image from "next/image";

const SingupPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    dispatch(createUser(data)).then((res) => {
      if (res.payload.error) {
        return toast.error("Duplicate email address.", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
      }
      router.push("/login");
      reset();
      toast.success("Account has been created.", {
        position: "bottom-left",
        autoClose: 2000,
        pauseOnHover: false,
      });
    });
  };

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
                className="text-yellow text text-[18px] sm:text-[20px] lg:text-[25px]"
                style={{ fontFamily: "Pacifico" }}
              >
                Register
              </p>
              <h1 className="text-[30px] sm:text-[35px] lg:text-[40px] font-semibold">
                Sing Up
              </h1>
            </div>
            <form
              className="flex flex-col gap-6 text-[14px] lg:text-[16px]"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-6 mt-4">
                <input
                  className="p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none"
                  {...register("firstname")}
                  type="text"
                  name="firstname"
                  placeholder="Firstname..."
                  required
                />
                <input
                  className="p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none"
                  {...register("lastname")}
                  type="text"
                  name="lastname"
                  placeholder="Lastname..."
                  required
                />
              </div>
              <div className="flex gap-6">
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
                  type="text"
                  {...register("phone")}
                  name="phone"
                  placeholder="Phone(0000000000)..."
                  required
                />
              </div>
              <input
                className="p-2 w-full focus:border-yellow border-[1px] border-solid focus:outline-none"
                {...register("password")}
                type="password"
                name="password"
                placeholder="password..."
                required
              />
              <div className="flex gap-4">
                <input type="checkbox" name="" id="" required />
                <p className="text-white text-[14px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  ipsa fuga.
                </p>
              </div>
              <button className="p-3 bg-yellow text-white" type="submit">
                Sing Up
              </button>
              <p className="text-white">
                Create an account?{" "}
                <Link href={"/login"} className="text-yellow cursor-pointer">
                  Click here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingupPage;
