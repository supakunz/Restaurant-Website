/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import CartComment from "../cartComment/CartComment";
import CommentData from "../assets/comment";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const CommentPage = ({ space }) => {
  const [windowWidth, setWindowWidth] = useState(1);

  const resizeWindow = () => {
    if (window.innerWidth < 900) {
      setWindowWidth(1);
    } else setWindowWidth(3);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <>
      <section
        className={`bg-grayWhite pb-[100px] ${space ? "pt-[100px]" : null}`}
      >
        <div data-aos="fade-up" className="container-section">
          <div className="flex flex-col text-center mb-[60px]">
            <p
              className="text-[18px] lg:text-[20px] text-yellow text"
              style={{ fontFamily: "Pacifico" }}
            >
              Testimonial
            </p>
            <h1 className="text-[35px] lg:text-[40px] font-semibold">
              Our Clients Say!!!
            </h1>
          </div>
          <Swiper
            slidesPerView={windowWidth}
            spaceBetween={25}
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
            className="mySwiper h-[280px]"
          >
            {CommentData.map((item) => {
              return (
                <SwiperSlide>
                  <CartComment
                    username={item.username}
                    image={item.image}
                    comment={item.comment}
                    MembershipLevel={item.MembershipLevel}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default CommentPage;
