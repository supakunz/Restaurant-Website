"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../store/cartSlice";

const CartSlidebar = ({ name, category, price, image }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartlist.cart);
  const total = cart.filter((item) => item.name == name).length;
  const priceNumber = Number(price);

  return (
    <>
      <div className="flex gap-4 items-center my-8">
        <div>
          <Image
            width={48}
            height={48}
            className="w-[3rem]"
            src={image}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start gap-1 w-[130px]">
          <p className="text-[14px]">{name}</p>
          <p className="p-[3px_9px] text-blackBlue text-[11px] bg-yellow rounded-full">
            {category}
          </p>
        </div>
        <div className="flex justify-between w-[135px]">
          <p className="text-[15px]">x {total}</p>
          <p className="text-[15px]">$ {(priceNumber * total).toFixed(2)}</p>
          <i
            onClick={() => dispatch(removeCart(name))}
            className="bx bxs-trash bg-red-500 text-white text-[17px] p-2 rounded-md cursor-pointer hover:bg-red-400"
          ></i>
        </div>
      </div>
    </>
  );
};

export default CartSlidebar;
