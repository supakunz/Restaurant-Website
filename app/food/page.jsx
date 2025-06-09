/* eslint-disable react/jsx-key */
"use client";

import hero_product from "../../components/assets/hero_product";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Hero from "../../components/hero/Hero";
import Service from "../../components/service/ServicePage";
import AboutPage from "../../components/about/AboutPage";
import Popular from "../../components/popular/Popular";
import Membership from "../../components/member/Membership";
import Team from "../../components/teamMember/Team";
import CommentPage from "../../components/comments/CommentPage";

const Home = () => {
  return (
    <>
      <section>
        <Swiper
          centeredSlides={true}
          // loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {hero_product.map((item) => {
            return (
              <SwiperSlide>
                <Hero
                  content={item.content}
                  button={item.button}
                  banner={item.banner}
                  link={item.link}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <Service showdata={4} />
      <AboutPage />
      <Popular />
      <Membership />
      <Team showdata={4} />
      <CommentPage />
    </>
  );
};

export default Home;
