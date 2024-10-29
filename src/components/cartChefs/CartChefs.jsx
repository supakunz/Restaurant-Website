import Image from "next/image";
import React from "react";

const CartChefs = (props) => {
  return (
    <>
      <section className="h-[270px] sm:h-[325px] lg:h-[345px]">
        <div className="flex flex-col items-center text-center pt-7 bg-white group overflow-hidden rounded-xl shadow-md">
          <div className="w-[150px] sm:w-[200px] rounded-full overflow-hidden mb-3">
            <Image
              // width={500}
              className="group-hover:scale-[1.1] transition ease-linear duration-200"
              src={props.image}
              alt=""
            />
          </div>
          <div className="mb-4">
            <p className="text-[16px] sm:text-[18px] font-semibold">
              {props.firstname} {props.lastname}
            </p>
            <p className="text-[13px] sm:text-[14px] text-grayLight font-medium">
              {props.position}
            </p>
          </div>
          <div
            className="max-h-0 group-hover:max-h-[50px]"
            style={{ transition: "linear max-height 0.2s" }}
          >
            <div className="flex text-white text-[16px] md:text-[18px] lg:text-[20px] items-center gap-2 ">
              <div className="p-[7px] lg:p-[8px] bg-yellow flex rounded-t-full">
                <i class="bx bxl-facebook-circle"></i>
              </div>
              <div className="p-[7px] lg:p-[8px] bg-yellow flex rounded-t-full">
                <i class="bx bxl-twitter"></i>
              </div>
              <div className="p-[7px] lg:p-[8px] bg-yellow flex rounded-t-full">
                <i class="bx bxl-instagram"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartChefs;
