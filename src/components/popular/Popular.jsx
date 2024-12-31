/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import FoodItem from "../foodItem/FoodItem";
import PopularMenu from "../assets/popular";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Popular = () => {
  const [windowWidth, setWindowWidth] = useState(1);

  const resizeWindow = () => {
    if (window.innerWidth < 768) {
      setWindowWidth(1);
    } else setWindowWidth(3);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <>
      <section className="bg-grayWhite h-full py-[100px]">
        <div className="container-section">
          <div
            data-aos="fade-up"
            className="flex flex-col text-center mb-[90px] lg:mb-[100px]"
          >
            <p
              className="text-[18px] lg:text-[20px] text-yellow text"
              style={{ fontFamily: "Pacifico" }}
            >
              Food Menu
            </p>
            <h1 className="text-[35px] lg:text-[40px] font-semibold">
              Most Popular Items
            </h1>
          </div>
          <div data-aos="fade-up" data-aos-delay={150}>
            <Swiper
              slidesPerView={windowWidth}
              spaceBetween={40}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              // navigation={true}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper h-[450px]"
            >
              {PopularMenu.map((item) => {
                return (
                  <SwiperSlide>
                    <FoodItem
                      name={item.name}
                      image={item.image}
                      details={item.details}
                      category={item.category}
                      price={item.price}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="flex justify-center my-5">
              <Link
                href={"/menu"}
                className="p-[13px_26px] lg:p-[15px_30px] text-[15px] lg:text-[16px] rounded-md bg-yellow text-white  hover:bg-yellowHover"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
