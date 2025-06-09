/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import CartSlidebar from "./CartSlidebar";
import { useSelector } from "react-redux";
import Link from "next/link";

const SlideBar = ({ toggle, setToggle }) => {
  const itemCart = useSelector((state) => state.cartlist.cart);
  const [total, setTotal] = useState(0);

  const getTotalPrice = () => {
    let count = 0;
    itemCart.forEach((item) => {
      count += Number(item.price);
    });
    return setTotal(count);
  };

  useEffect(() => {
    getTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCart]);

  return (
    <>
      <section>
        <div
          className={`fixed bg-white h-screen w-[26rem] top-[70px] ${
            toggle ? "right-0" : "-right-[30rem]"
          } z-50 p-5 transition-all duration-300 shadow-2xl`}
        >
          <div className="max-h-[30rem] overflow-scroll px-3">
            {itemCart
              .filter(
                (obj1, i, arr) =>
                  arr.findIndex((obj2) => obj2.id === obj1.id) === i
              )
              .map((item) => {
                return (
                  <CartSlidebar
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    image={item.image}
                  />
                );
              })}
          </div>
          <div className="border-solid border-t-[1px] border-black ">
            <div className="flex justify-between items-center text-[20px] my-4">
              <p>Sub Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center gap-4 text-white">
              <Link href={"/food/cart"} className="flex-1">
                <button
                  onClick={() => {
                    setToggle(false);
                  }}
                  className="bg-yellow w-full h-[2.3rem] rounded-md hover:bg-yellowHover"
                >
                  Cart
                </button>
              </Link>
              <Link href={"/food/chechout"} className="flex-1">
                <button
                  onClick={() => {
                    setToggle(false);
                  }}
                  className="bg-yellow w-full h-[2.3rem] rounded-md hover:bg-yellowHover"
                >
                  Check out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideBar;
