"use client";

/* eslint-disable react/jsx-key */
import CartService from "../cartService/CartService";
import service_product from "../assets/service";

const Service = ({ showdata }) => {
  return (
    <>
      <section className="bg-grayWhite">
        <div className="container-section py-[100px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.2rem] ">
            {service_product
              .slice(0, showdata || service_product.length)
              .map((item, index) => {
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 150} // เพิ่ม delay ทีละ 100ms
                    key={index}
                  >
                    <CartService name={item.name} icon={item.icon} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
