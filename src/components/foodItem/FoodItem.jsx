import Image from "next/image";

const FoodItem = (props) => {
  return (
    <>
      <section>
        <div className="flex flex-col items-center text-center gap-y-4 md:gap-y-3">
          <Image
            className="w-[170px] lg:w-[180px]"
            width={180}
            src={props.image}
            alt=""
          />
          <p className="p-[5px_10px] text-white text-[11px] lg:text-[12px] bg-yellow rounded-full">
            {props.category}
          </p>
          <h3 className="text-[20px] lg:text-[23px] font-medium">
            {props.name}
          </h3>
          <p className="text-[14px] lg:text-[16px] text-grayLight">
            {props.details}
          </p>
          <p className="text-[14px] lg:text-[16px]">{props.price} $</p>
          <div className="text-[14px] lg:text-[16px] text-yellow flex gap-1">
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodItem;
