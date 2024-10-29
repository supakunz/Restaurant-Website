"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/cartSlice";
import { toast } from "react-toastify";
import Image from "next/image";

const CartMenu = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart"));

  const handleAddcart = () => {
    if (!token) {
      return toast.error("Please login to continue", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
        pauseOnHover: false,
      });
    }
    dispatch(addCart(props));
  };

  return (
    <section>
      <div className="flex flex-col items-center text-center p-6 gap-y-4 bg-white rounded-xl shadow-sm">
        <Image
          width={110}
          height={110}
          className="w-[110px]"
          src={props.image}
          alt=""
        />
        <p className="p-[5px_10px] text-blackBlue text-[12px] bg-yellow rounded-full">
          {props.category}
        </p>
        <h3 className="text-[19px] text-blackBlue font-semibold">
          {props.name}
        </h3>
        <p>{props.price} $</p>
        <div className="text-yellow flex gap-1">
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
        </div>
        <div className="flex gap-4">
          <i className="bx bx-show-alt text-white text-[20px] p-[5px] bg-blackBlue rounded-md cursor-pointer transition ease-linear duration-100 hover:scale-[1.2] hover:text-yellowHover"></i>
          <i
            onClick={handleAddcart}
            className="bx bx-cart-add text-white text-[20px] p-[5px] bg-blackBlue rounded-md cursor-pointer transition ease-linear duration-100 hover:scale-[1.2] hover:text-yellowHover"
          ></i>
          <i className="bx bx-heart text-white text-[20px] p-[5px] bg-blackBlue rounded-md cursor-pointer transition ease-linear duration-100 hover:scale-[1.2] hover:text-yellowHover"></i>
        </div>
      </div>
    </section>
  );
};

export default CartMenu;
