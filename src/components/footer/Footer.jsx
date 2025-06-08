"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <>
      <section className="bg-blackBlue">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 container-section gap-y-6 text-white pt-[40px] pb-[50px]">
          <div className="flex flex-col gap-5">
            <h1
              className="text-[23px] lg:text-[25px] text-yellow textline"
              style={{ fontFamily: "Pacifico" }}
            >
              Company
            </h1>
            <ul className="text-[14px] lg:text-[16px] inline-flex flex-col gap-[0.35rem]">
              <Link href={"/"}>
                <span
                  className="hover:text-yellow relative left-0 hover:left-[5px]"
                  style={{ transition: "left 0.2s" }}
                >
                  <i class="bx bx-chevron-right mr-[0.4rem] text-[16px] lg:text-[18px]"></i>
                  Home
                </span>
              </Link>
              <Link href={"/about"}>
                <span
                  className="hover:text-yellow relative left-0 hover:left-[5px]"
                  style={{ transition: "left 0.2s" }}
                >
                  <i class="bx bx-chevron-right mr-[0.4rem] text-[16px] lg:text-[18px]"></i>
                  About Us
                </span>
              </Link>
              <Link href={"/contact"}>
                <span
                  className="hover:text-yellow relative left-0 hover:left-[5px]"
                  style={{ transition: "left 0.2s" }}
                >
                  <i class="bx bx-chevron-right mr-[0.4rem] text-[16px] lg:text-[18px]"></i>
                  Contact Us
                </span>
              </Link>
              <Link href={"/"}>
                <span
                  className="hover:text-yellow relative left-0 hover:left-[5px]"
                  style={{ transition: "left 0.2s" }}
                >
                  <i class="bx bx-chevron-right mr-[0.4rem] text-[16px] lg:text-[18px]"></i>
                  Reservation
                </span>
              </Link>
              <Link href={"/"}>
                <span
                  className="hover:text-yellow relative left-0 hover:left-[5px]"
                  style={{ transition: "left 0.2s" }}
                >
                  <i class="bx bx-chevron-right mr-[0.4rem] text-[16px] lg:text-[18px]"></i>
                  Privacy Policy
                </span>
              </Link>
              <Link href={"/"}>
                <span
                  className="hover:text-yellow relative left-0 hover:left-[5px]"
                  style={{ transition: "left 0.2s" }}
                >
                  <i class="bx bx-chevron-right mr-[0.4rem] text-[16px] lg:text-[18px]"></i>
                  Terms & Condition
                </span>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h1
              className="text-[23px] lg:text-[25px] text-yellow textline"
              style={{ fontFamily: "Pacifico" }}
            >
              Contact
            </h1>
            <ul className="text-[14px] lg:text-[16px] flex flex-col gap-[0.35rem]">
              <li>
                <i class="bx bxs-map text-[18px] lg:text-[19px] mr-[0.6rem]"></i>
                123 Street, New York, USA
              </li>
              <li>
                <i class="bx bxs-phone text-[18px] lg:text-[19px] mr-[0.6rem]"></i>
                +012 345 67890
              </li>
              <li>
                <i class="fa fa-envelope text-[18px] lg:text-[19px] mr-[0.9rem]"></i>
                info@example.com
              </li>
            </ul>
            <div className="text-[16px] lg:text-[19px] flex gap-2">
              <i class="bx bxl-twitter p-[0.5rem] rounded-full border-white border-solid border-[1px] hover:bg-white hover:text-yellow cursor-pointer"></i>
              <i class="bx bxl-youtube p-[0.5rem] rounded-full border-white border-solid border-[1px] hover:bg-white hover:text-yellow cursor-pointer"></i>
              <i class="bx bxl-facebook p-[0.5rem] rounded-full border-white border-solid border-[1px] hover:bg-white hover:text-yellow cursor-pointer"></i>
              <i class="bx bxl-linkedin p-[0.5rem] rounded-full border-white border-solid border-[1px] hover:bg-white hover:text-yellow cursor-pointer"></i>
            </div>
          </div>
          <div className="flex flex-col">
            <h1
              className="text-[23px] lg:text-[25px] text-yellow textline"
              style={{ fontFamily: "Pacifico" }}
            >
              Opening
            </h1>
            <div className="pt-[1.25rem] pb-[1rem] flex flex-col gap-[0.1rem]">
              <p className="text-[17px] lg:text-[19px]">Monday - Saturday</p>
              <p className="text-[14px] lg:text-[16px]">09AM-09PM</p>
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <p className="text-[17px] lg:text-[19px]">Sunday</p>
              <p className="text-[14px] lg:text-[16px]">10AM-08PM</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1
              className="text-[23px] lg:text-[25px] text-yellow textline"
              style={{ fontFamily: "Pacifico" }}
            >
              Newsletter
            </h1>
            <p className="text-[14px] lg:text-[16px] w-full lg:max-w-[18rem]">
              Dolor amet sit justo amet elitr clita ipsum elitr est.
            </p>
            <form className="relative" action="">
              <input
                className="text-[15px] text-black p-4 rounded-md w-full sm:w-[90%]"
                type="email"
                name=""
                id=""
                placeholder="Your email"
                required
              />
              <button
                type="submit"
                className="p-[10px_20px] rounded-md bg-yellow text-[15px] absolute top-[6.2px] right-[2%] sm:right-[13%] lg:right-[13%]"
              >
                SIGNUP
              </button>
            </form>
          </div>
        </div>
        <div className="text-white text-[13px] lg:text-[15px] flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-between container-section border-solid border-[#555555b3] border-t-[1px] pt-4 pb-[3rem]">
          <div>
            <p className="mb-2">© 2024 Developer by Supakun Thata</p>
            <p>
              Inspiration Design By :{" "}
              <a
                className="cursor-pointer text-yellow"
                href="https://www.free-css.com/free-css-templates/page290/restoran"
                target="_blank"
              >
                HTML Codex
              </a>
            </p>
          </div>
          <div>
            <ul className="flex gap-1 sm:gap-3">
              <li className="border-[#555555b3] border-solid border-r-[1px] px-5">
                Home
              </li>
              <li className="border-[#555555b3] border-solid border-r-[1px] px-5">
                Cookies
              </li>
              <li className="border-[#555555b3] border-solid border-r-[1px] px-5">
                Help
              </li>
              <li className="px-5">FAQs</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
