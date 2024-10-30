import member_image from "../assets/image/memberSection.jpg";
import Link from "next/link";
import Image from "next/image";

const Membership = () => {
  return (
    <>
      <section className='overflow-hidden relative before:content-[""] before:absolute before:bg-[#000000b3] before:z-[-9] before:w-full before:h-screen'>
        <div className="container-section flex flex-col p-[30px] text-center items-center justify-center gap-6">
          <Image
            width={500}
            className="absolute z-[-10] w-full  object-cover"
            src={member_image}
            alt=""
          />
          <h1 className="text-[26px] md:text-[35px] lg:text-[40px] text-white font-semibold">
            Sign up for a special membership to receive monthly or seasonal
            discounts.
          </h1>
          <Link
            href={"/membership"}
            className="p-[13px_25px] lg:p-[15px_30px] bg-yellow text-white text-[15px] lg:text-[16px] hover:bg-yellowHover"
          >
            go to member
          </Link>
        </div>
      </section>
    </>
  );
};

export default Membership;
