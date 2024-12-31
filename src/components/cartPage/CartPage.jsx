/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../../store/cartSlice";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const dispatch = useDispatch();
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
        <div className="container-section py-[100px]">
          <div className="text-center">
            <p
              className="text-yellow text-[18px] lg:text-[20px] text"
              style={{ fontFamily: "Pacifico" }}
            >
              Cart
            </p>
            <h1 className="text-[35px] lg:text-[40px] font-semibold">
              Your Cart
            </h1>
          </div>
          <div className="mt-10  overflow-scroll max-h-[31.4rem] rounded-md">
            <table className="table-auto w-full text-center min-w-[43rem] ">
              <thead className="bg-blackBlue text-white text-[14px] lg:text-[16px]">
                <tr>
                  <th className="py-4 px-4">Image</th>
                  <th>Product</th>
                  <th className="px-2">Category</th>
                  <th className="px-3">Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {itemCart
                  .filter(
                    (obj1, i, arr) =>
                      arr.findIndex((obj2) => obj2.id === obj1.id) === i
                  )
                  .map((item, index) => (
                    <tr>
                      <td className="border border-[#cdcdcd] ">
                        <div className="flex justify-center items-center py-3">
                          <Image
                            src={item.image}
                            width={65}
                            height={65}
                            className="w-[50px] md:w-[60px] lg:w-[65px]"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="border border-[#cdcdcd] text-[14px] lg:text-[16px]">
                        {item.name}
                      </td>
                      <td className="border border-[#cdcdcd]">
                        <div className="flex justify-center">
                          <p className="p-[5px_12px] text-blackBlue text-[12px] lg:text-[14px] bg-yellow rounded-full ">
                            {item.category}
                          </p>
                        </div>
                      </td>
                      <td className="border border-[#cdcdcd] text-[14px] lg:text-[16px]">
                        {item.price}$
                      </td>
                      <td className="border border-[#cdcdcd]">
                        <div className="flex justify-center items-center">
                          <div className="flex w-[9rem] justify-between items-center border-solid border-[1px] text-[14px] lg:text-[16px] rounded-md overflow-hidden">
                            <p
                              onClick={() => dispatch(removeCart(item.name))}
                              className="p-[5px_13px] bg-yellow cursor-pointer hover:bg-yellowHover"
                            >
                              -
                            </p>
                            <p>
                              {
                                itemCart.filter(
                                  (data) => data.name == item.name
                                ).length
                              }
                            </p>
                            <p
                              onClick={() => dispatch(addCart(item))}
                              className="p-[5px_10px] bg-yellow cursor-pointer hover:bg-yellowHover"
                            >
                              +
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border border-[#cdcdcd] text-[14px] lg:text-[16px]">
                        {(
                          Number(item.price) *
                          itemCart.filter((data) => data.name == item.name)
                            .length
                        ).toFixed(2)}
                        $
                      </td>
                      <td className="border border-[#cdcdcd]">
                        <div>
                          <i
                            onClick={() => dispatch(removeCart(item.name))}
                            className="bx bxs-trash bg-red-500 text-white text-[20px] lg:text-[25px] p-2 lg:p-[0.6rem] rounded-md cursor-pointer hover:bg-red-400"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between">
            <div className="flex h-[2.7rem] rounded-md overflow-hidden">
              <input
                className="w-full md:w-[12rem] lg:w-[13.5em] border-solid border-y-[1px] border-l-[1px] border-[#cdcdcd] rounded-l-md"
                type="text"
              />
              <button className="bg-yellow p-[0.5rem] w-[9rem] sm:w-[8rem] md:w-[7.5rem] lg:p-[0.7rem text-[14px] lg:text-[15px] hover:bg-yellowHover ">
                Apply Coupon
              </button>
            </div>
            <div>
              <div className="bg-white p-5 h-[16rem] w-full md:w-[22rem] mt-7 md:mt-0 mb-5 flex flex-col gap-4 rounded-md">
                <h1 className="text-[20.5px] lg:text-[23px] font-semibold mb-[0.6rem]">
                  Cart totol
                </h1>
                <div className="flex justify-between text-[15px] lg:text-[16px]">
                  <p>Sub Total</p>
                  <p>$ {total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-[15px] lg:text-[16px]">
                  <p>Coupon</p>
                  <p>-</p>
                </div>
                <div className="flex justify-between text-[15px] lg:text-[16px]">
                  <p>Tax</p>
                  <p>$ {total.toFixed(2)} (7%)</p>
                </div>
                <hr />
                <div className="flex justify-between text-[16px] lg:text-[17px] font-semibold">
                  <p>Total</p>
                  <p>$ {(total * 0.07 + total).toFixed(2)}</p>
                </div>
              </div>
              <Link href={"/chechout"}>
                <button className="bg-yellow p-[0.7rem] w-full text-[17px] lg:text-[18px] rounded-md hover:bg-yellowHover">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
