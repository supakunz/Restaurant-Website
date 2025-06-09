/* eslint-disable react/jsx-key */
"use client";

import CartMember from "./CartMember";
import member_packgate from "../assets/memberpack";

const MemberPage = () => {
  return (
    <>
      <section>
        <div className="container-section py-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {member_packgate.map((item, index) => {
              return (
                <CartMember
                  pack={item.pack}
                  price={item.price}
                  detail={item.detail}
                  more={item.more}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MemberPage;
