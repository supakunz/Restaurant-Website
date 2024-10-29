/* eslint-disable react/jsx-key */
"use client";

import CartChefs from "../cartChefs/CartChefs";
import Teamchefs from "../assets/teamchef";

const Team = ({ showdata }) => {
  return (
    <>
      <section className="bg-grayWhite py-[100px]">
        <div className="container-section">
          <div className="flex flex-col text-center mb-[60px]">
            <p
              className="text-[18px] lg:text-[20px] text-yellow text"
              style={{ fontFamily: "Pacifico" }}
            >
              Food Menu
            </p>
            <h1 className="text-[35px] lg:text-[40px] font-semibold">
              Our Master Chefs
            </h1>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1.6rem] h-full">
            {Teamchefs.slice(0, showdata || Teamchefs.length).map((item) => (
              <CartChefs
                firstname={item.firstname}
                lastname={item.lastname}
                image={item.image}
                position={item.position}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
