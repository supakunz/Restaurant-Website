"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import logo_nav from "../assets/image/logov3.png";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import SlideBar from "../slidebar/SlideBar";
import { loadItem } from "../../store/cartSlice";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [checkToken, setCheckToken] = useState(false);
  const [slidebar, setSlidebar] = useState(false);
  const [localtoken, setLocaltoken] = useState(null);
  // const [localcart, setLocalcart] = useState(null);
  const token = useSelector((state) => state.user.token);
  // const localtoken = localStorage.getItem("token");
  // const localcart = JSON.parse(localStorage.getItem("cart"));
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartlist.cart); // **เรียกใช้ทำให้ rerender component **
  const navRef = useRef();
  const navMenuRef = useRef();
  const miniMenuRef = useRef();
  const arrowRef = useRef();

  const handleToggle = () => {
    if (toggle) {
      miniMenuRef.current.classList.add("max-h-[250px]");
      arrowRef.current.classList.add("rotate-90");
    } else {
      miniMenuRef.current.classList.remove("max-h-[250px]");
      arrowRef.current.classList.remove("rotate-90");
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    const localtokens = localStorage.getItem("token");
    // const localcarts = localStorage.getItem("cart");
    setLocaltoken(localtokens ? localtokens : null);
    // setLocalcart(localcarts ? localcarts : []);
  }, []);

  // console.log(cart.length);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navRef.current.classList.add("!bg-blackBlue");
      }
      if (window.scrollY < 50) {
        navRef.current.classList.remove("!bg-blackBlue");
        setSlidebar(false);
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      return setCheckToken(true);
    }
    setCheckToken(false);
  }, [token]);

  useEffect(() => {
    dispatch(loadItem());
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="py-[5px] w-screen bg-[#0f172b] lg:bg-transparent fixed z-20 transition ease-linear duration-200"
      >
        <div className="flex items-center justify-between container-section">
          <Link href={"/"} className="logo flex items-center gap-2">
            <Image className="w-[55px] lg:w-[60px] ani" src={logo_nav} alt="" />
            <h1 className="text-[15px] sm:text-[18px] lg:text-[23px] text-white font-semibold">
              RESTAURANT
            </h1>
          </Link>
          <div className="nav-menu flex text-[15px] text-white gap-[10px]">
            <ul className="hidden lg:flex items-center justify-center">
              <Link
                href={"/"}
                className="p-[15px] hover:text-yellow transition duration-300"
              >
                HOME
              </Link>
              <Link
                href={"/about"}
                className="p-[15px] hover:text-yellow transition duration-300"
              >
                ABOUT
              </Link>
              <Link
                href={"/service"}
                className="p-[15px] hover:text-yellow transition duration-300"
              >
                SERVICE
              </Link>
              <Link
                href={"/menu"}
                className="p-[15px] hover:text-yellow transition duration-300"
              >
                MENU
              </Link>
              <div class="mx-auto flex w-full items-center justify-center">
                <div class="group relative cursor-pointer">
                  <div class="flex items-center justify-between gap-2 p-[15px]">
                    <a
                      class="menu-hover text-base font-medium text-[16px] text-white group-hover:text-yellow"
                      onClick=""
                    >
                      PAGES
                    </a>
                    <span className="group-hover:text-yellow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div class="invisible opacity-0 absolute z-50 text-[15px] flex w-[9rem] top-[3.9rem] flex-col bg-gray-100 py-1 px-4 transition-all duration-300 text-gray-800 shadow-xl group-hover:visible group-hover:opacity-100">
                    <Link
                      href={"/ourteam"}
                      class="my-2 block border-b border-gray-100 py-1 text-gray-500 hover:text-black md:mx-2 "
                    >
                      Our Team
                    </Link>
                    <Link
                      href={"/testimonial"}
                      class="my-2 block border-b border-gray-100 py-1 text-gray-500 hover:text-black md:mx-2"
                    >
                      Testimonial
                    </Link>
                    <Link
                      href={"/booking"}
                      class="my-2 block border-b border-gray-100 py-1 text-gray-500 hover:text-black md:mx-2"
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href={"/contact"}
                className="p-[15px] hover:text-yellow transition duration-300"
              >
                CONTACT
              </Link>
            </ul>
            <div className="flex lg:hidden items-center">
              <Hamburger
                size={30}
                toggled={isOpen}
                toggle={setOpen}
                onToggle={(toggle) =>
                  toggle
                    ? navMenuRef.current.classList.add("max-h-[550px]")
                    : navMenuRef.current.classList.remove("max-h-[550px]")
                }
              />
            </div>
            <div
              ref={navMenuRef}
              className="absolute top-[4rem] left-0 w-full flex items-center justify-start bg-blackBlue overflow-hidden max-h-0"
              style={{ transition: "linear max-height 0.2s" }}
            >
              <ul className="flex flex-col p-[42px] text-[13px] sm:text-[14px] lg:text-[16px]">
                <Link
                  href={"/"}
                  onClick={() => {
                    setOpen(false);
                    navMenuRef.current.classList.remove("max-h-[550px]");
                  }}
                  className="cursor-pointer mb-7 hover:text-yellow transition duration-300"
                >
                  HOME
                </Link>
                <Link
                  href={"/about"}
                  onClick={() => {
                    setOpen(false);
                    navMenuRef.current.classList.remove("max-h-[550px]");
                  }}
                  className="cursor-pointer mb-7 hover:text-yellow transition duration-300"
                >
                  ABOUT
                </Link>
                <Link
                  href={"/service"}
                  onClick={() => {
                    setOpen(false);
                    navMenuRef.current.classList.remove("max-h-[550px]");
                  }}
                  className="cursor-pointer mb-7 hover:text-yellow transition duration-300"
                >
                  SERVICE
                </Link>
                <Link
                  href={"/menu"}
                  onClick={() => {
                    setOpen(false);
                    navMenuRef.current.classList.remove("max-h-[550px]");
                  }}
                  className="cursor-pointer mb-7 hover:text-yellow transition duration-300"
                >
                  MENU
                </Link>
                <li
                  className="flex items-start cursor-pointer relative right-2 mb-7 group"
                  onClick={handleToggle}
                >
                  <i
                    ref={arrowRef}
                    class="bx bx-chevron-right text-[18px] mt-[2px] transition duration-300 group-hover:text-yellow"
                  ></i>
                  <span className="flex flex-col">
                    <p className="group-hover:text-yellow transition duration-300">
                      PAGES
                    </p>
                    <ul
                      ref={miniMenuRef}
                      className="pl-3 flex flex-col gap-6 cursor-pointer overflow-hidden max-h-0"
                      style={{ transition: "linear max-height 0.2s" }}
                    >
                      <Link
                        href={"/ourteam"}
                        onClick={() => {
                          setOpen(false);
                          navMenuRef.current.classList.remove("max-h-[550px]");
                        }}
                        className="mt-7 hover:text-yellow transition duration-300"
                      >
                        OurTeam
                      </Link>
                      <Link
                        href={"/testimonial"}
                        onClick={() => {
                          setOpen(false);
                          navMenuRef.current.classList.remove("max-h-[550px]");
                        }}
                        className="hover:text-yellow transition duration-300"
                      >
                        Testimonial
                      </Link>
                      <Link
                        href={"/booking"}
                        onClick={() => {
                          setOpen(false);
                          navMenuRef.current.classList.remove("max-h-[550px]");
                        }}
                        className="hover:text-yellow transition duration-300"
                      >
                        Booking
                      </Link>
                    </ul>
                  </span>
                </li>
                <Link
                  href={"/contact"}
                  onClick={() => {
                    setOpen(false);
                    navMenuRef.current.classList.remove("max-h-[550px]");
                  }}
                  className="cursor-pointer hover:text-yellow transition duration-300"
                >
                  CONTACT
                </Link>
              </ul>
            </div>
            {checkToken || localtoken ? (
              <div className="flex gap-[15px] items-center">
                <a
                  onClick={() => {
                    setSlidebar(!slidebar);
                  }}
                  className="cursor-pointer p-[7px] lg:p-[9px] bg-yellow border-soLinkd border-[1px] flex items-center justify-center border-yellow rounded-md hover:bg-yellowHover transition duration-300 relative"
                >
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-[20px] h-[20px] text-center text-[13px]">
                    {cart.length}
                  </span>{" "}
                  <i class="bx bxs-cart-alt cartIcon text-[20px]"></i>
                </a>
                <a className="cursor-pointer p-[7px] lg:p-[9px] bg-yellow border-soLinkd border-[1px] flex items-center justify-center border-yellow rounded-md hover:bg-yellowHover transition duration-300 relative">
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-[20px] h-[20px] text-center text-[13px]">
                    0
                  </span>
                  <i class="bx bxs-heart wishlistIcon text-[20px]"></i>
                </a>
                <Link
                  href={"/account"}
                  className="p-[7px] lg:p-[9px] bg-yellow border-soLinkd border-[1px] flex items-center justify-center border-yellow rounded-md hover:bg-yellowHover transition duration-300"
                >
                  <i class="bx bxs-user text-[20px]"></i>
                </Link>
              </div>
            ) : (
              <div className="flex gap-[15px] items-center">
                <Link
                  href={"/singup"}
                  className="text-[14px] sm:text-[16px] p-[5px_6px] sm:p-[7px] lg:p-[10px] bg-yellow border-soLinkd border-[1px] border-yellow rounded-md hover:bg-yellowHover transition duration-300"
                >
                  Singup
                </Link>
                <Link
                  href={"/login"}
                  className="text-[14px] sm:text-[16px] p-[5px_11px] sm:p-[7px_13px] lg:p-[10px_15px] border-soLinkd border-[1px] border-yellow rounded-md hover:bg-yellowHover transition duration-300"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <SlideBar toggle={slidebar} setToggle={setSlidebar} />
    </>
  );
};

export default Navbar;
