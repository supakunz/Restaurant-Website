/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/userThunk";
import { logOut } from "../../store/UserSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const dispatch = useDispatch();
  const itemCart = useSelector((state) => state.cartlist.cart);
  const { token } = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState({
    sessionid: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    zip_code: "",
    city: "",
    state: "",
  });
  const route = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  const getTotalPrice = () => {
    let count = 0;
    itemCart.forEach((item) => {
      count += Number(item.price);
    });
    return setTotal(count);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  useEffect(() => {
    getTotalPrice();
  }, [itemCart]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    // เงื่อนไขตรวจสอบว่ากด logout เอง
    if (!token) {
      toast.error("Please login again ❌", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
        pauseOnHover: false,
      });
      return route.replace("/food");
    }

    dispatch(getUser(token))
      .unwrap() // ใช้ unwrap กับ thunk เพื่อจัดการ error โดยตรง
      .then((res) =>
        setUserData({
          sessionid: res.data.sessionid,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          country: res.data.country,
          zip_code: res.data.zip_code,
          city: res.data.city,
          state: res.data.state,
        })
      )
      .catch(() => {
        dispatch(logOut());
        toast.error("Failed to fetch user data ❌", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
        route.replace("/food");
      });
  }, [token, hasMounted]);

  return (
    <>
      <section>
        <div className="container-section py-[100px]">
          <div className="text-center">
            <p
              className="text-yellow text-[18px] lg:text-[20px] text"
              style={{ fontFamily: "Pacifico" }}
            >
              Order
            </p>
            <h1 className="text-[35px] lg:text-[40px] font-semibold">
              Your Order
            </h1>
          </div>
          <div className="flex flex-col gap-5 my-[2.5rem]  text-[14px] lg:text-[16px]">
            <div className="bg-[#affdaf] p-4 rounded-xl">
              <p>You already have an account.</p>
            </div>
            <div className="flex justify-between bg-[#fea1164d] p-4 rounded-xl hover:bg-[#fea116] transition-all duration-300">
              <p>Have a coupon ?</p>
              <p>Click here to enter code</p>
            </div>
          </div>
          <div className="flex gap-9 flex-col md:flex-row">
            <div className="flex-1 text-[14px] lg:text-[16px]">
              <h1 className="text-[23px] lg:text-[26px] font-semibold mb-4">
                Billing Details
              </h1>
              <div className="flex flex-col gap-5">
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  name="firstname"
                  value={userData.firstname}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  name="lastname"
                  value={userData.lastname}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  placeholder="Company Name(optional)"
                  disabled
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  name="country"
                  placeholder="Country / Region"
                  value={userData.country}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  name="city"
                  placeholder="Town / City"
                  value={userData.city}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={userData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="number"
                  name="zip_code"
                  placeholder="ZIP"
                  value={userData.zip_code}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 text-[#6b6b6b] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  type="number"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-5">
                <h1 className="text-[23px] lg:text-[26px] font-semibold mb-4">
                  Additional Information
                </h1>
                <textarea
                  className="p-3 w-full h-[9.5rem] border-solid border-[1px] border-[#9a9a9a] rounded-md focus:border-yellow focus:outline-none"
                  placeholder="Notes about your order, e.g. special note for delivery"
                  style={{ resize: "none" }}
                ></textarea>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-[23px] lg:text-[26px] font-semibold mb-4">
                Your Order
              </h1>
              <div className="bg-white p-3 rounded-md text-[14px] lg:text-[15px]">
                {/* ------------------------------------------------ */}
                <div className="max-h-[13.3rem] overflow-scroll">
                  {itemCart
                    .filter(
                      (obj1, i, arr) =>
                        arr.findIndex((obj2) => obj2.id === obj1.id) === i
                    )
                    .map((item, index) => (
                      <div>
                        <div className="flex justify-between p-2 border-solid border-b-[1px] border-[#d5d5d580]">
                          <p>
                            {item.name}
                            <span>
                              {" "}
                              x{" "}
                              {
                                itemCart.filter(
                                  (data) => data.name == item.name
                                ).length
                              }
                            </span>
                          </p>
                          <p>
                            {(
                              Number(item.price) *
                              itemCart.filter((data) => data.name == item.name)
                                .length
                            ).toFixed(2)}{" "}
                            $
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                {/* ------------------------------------------------ */}
                <div className="flex flex-col p-3 bg-[#fea1164d] gap-[0.8rem]">
                  <div className="flex justify-between">
                    <p>SubTotal</p>
                    <p>{total.toFixed(2)} $</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax</p>
                    <p>7%</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total</p>
                    <p>{(total * 0.07 + total).toFixed(2)} $</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-[23px] lg:text-[26px] font-semibold mb-4">
                  Payment Method
                </h1>
                <div className="bg-white rounded-md p-2 text-[15px] lg:text-[16px]">
                  <div>
                    <div className="flex justify-between p-2">
                      <div className="flex items-center gap-3">
                        <i className="bx bx-credit-card text-[20px] text-yellow"></i>
                        <p>Credit Card</p>
                      </div>
                      <input
                        className="w-[50px] accent-black"
                        type="radio"
                        name="list-radio"
                      />
                    </div>
                    <div className="px-2 pt-2 pb-3 border-solid border-b-[1px] border-[#d5d5d580]">
                      <p className="text-[14px] lg:text-[15px] text-[#979797]">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eius, error rerum accusamus commodi quidem
                        delectus harum quia ipsum laborum excepturi aliquid
                        repellendus enim repudiandae perspiciatis, illo tempore
                        illum nemo odio.
                      </p>
                    </div>
                    <div className="flex justify-between px-2 py-4 border-solid border-b-[1px] border-[#d5d5d580]">
                      <div className="flex items-center gap-3">
                        <i className="bx bxl-paypal text-[20px] text-yellow"></i>
                        <p>Paypal</p>
                      </div>
                      <input
                        className="w-[50px] accent-black"
                        type="radio"
                        name="list-radio"
                      />
                    </div>
                    <div className="flex justify-between px-2 py-4 border-solid border-b-[1px] border-[#d5d5d580]">
                      <div className="flex items-center gap-3">
                        <i className="bx bxl-google text-[20px] text-yellow"></i>
                        <p>Google Pay</p>
                      </div>
                      <input
                        className="w-[50px] accent-black"
                        type="radio"
                        name="list-radio"
                      />
                    </div>
                    <div className="flex justify-between px-2 py-4 border-solid border-b-[1px] border-[#d5d5d580]">
                      <div className="flex items-center gap-3">
                        <i className="bx bxl-apple text-[20px] text-yellow"></i>
                        <p>Apple Pay</p>
                      </div>
                      <input
                        className="w-[50px] accent-black"
                        type="radio"
                        name="list-radio"
                      />
                    </div>
                    <div className="flex justify-between px-2 pt-4 pb-5">
                      <div className="flex items-center gap-3">
                        <i className="bx bxs-wallet-alt text-[20px] text-yellow"></i>
                        <p>Cash on Delivery</p>
                      </div>
                      <input
                        className="w-[50px] accent-black"
                        type="radio"
                        name="list-radio"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-7 mt-8">
                  <div className="p-5 bg-[#d5d5d580] rounded-md">
                    <p className="text-[14px] lg:text-[15px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iusto nisi accusamus explicabo quia officiis voluptates
                      quisquam, obcaecati voluptatum odio, ratione repellendus
                      saepe necessitatibus possimus deserunt asperiores earum
                      hic id provident? Tenetur incidunt aperiam distinctio
                      repellat ab? Voluptatibus adipisci sapiente libero?
                    </p>
                  </div>
                  <button className="p-[0.8rem] text-[14px] lg:text-[16px] bg-yellow text-white rounded-md">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
