const CartService = (props) => {
  return (
    <>
      <div className="service-cart flex flex-col text-center p-[30px_20px] bg-white hover:bg-yellow group transition duration-200 hover:-translate-y-3 shadow-md rounded-md">
        <i
          className={`bx ${props.icon} text-[55px] lg:text-[60px] text-yellow group-hover:text-white`}
        ></i>
        <h1 className="text-[18px] lg:text-[20px] font-semibold my-[10px] group-hover:text-white">
          {props.name}
        </h1>
        <p className="text-[14px] lg:text-[16px] text-[#747373] group-hover:text-white">
          Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam
        </p>
      </div>
    </>
  );
};

export default CartService;
