"use client";

import React, { useEffect, useRef } from "react";

const ScrollTop = () => {
  const scrollTopRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollTopRef.current.classList.remove("hidden");
      } else {
        scrollTopRef.current.classList.add("hidden");
      }
    });
  }, []);

  return (
    <>
      <div>
        <button
          ref={scrollTopRef}
          className="w-[48px] h-[48px] hidden bg-yellow text-white text-[22px] z-30 items-center justify-center fixed bottom-8 right-10 rounded-[8px] hover:bg-yellowHover transition ease-in-out duration-[0.45s]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i class="fa-solid fa-angle-up"></i>
        </button>
      </div>
    </>
  );
};

export default ScrollTop;
