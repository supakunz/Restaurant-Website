/* eslint-disable @next/next/no-img-element */
import React from "react";

const Preloader = () => {
  return (
    <>
      {/* Preloader */}
      <div className="preloader flex-column justify-content-center align-items-center">
        <img
          className="animation__shake"
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div>
    </>
  );
};

export default Preloader;
