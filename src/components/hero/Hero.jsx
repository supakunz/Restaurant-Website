import Link from "next/link";
import Image from "next/image";

const Hero = (props) => {
  return (
    <>
      <section>
        <div className='flex flex-col md:flex-row w-full h-screen items-center justify-center container-section before:content-[""] before:absolute before:bg-[#0f172bcb] before:z-[-9] before:w-full before:h-screen'>
          <Image
            className="absolute z-[-10] w-full h-screen object-cover"
            src={props.banner.bg_image}
            alt="bg_product_banner"
          />
          <div className="left-contents flex-1 flex items-end">
            <div className="sm:min-w-[500px] max-w-[400px] md:max-w-[320px] lg:max-w-[500px] text-center md:text-start">
              <h1 className="text-[42px] sm:text-[53px] lg:text-[65px] font-semibold leading-tight text-white">
                {props.content}
              </h1>
              <p className="text-[13px] sm:text-[14px] lg:text-[16px] text-white leading-relaxed mt-2">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat ame
              </p>
              <div className="button-content flex gap-5 mt-5 text-white justify-center md:justify-start">
                <Link
                  href={props.link.to_1}
                  onClick={() => window.scrollTo(0, 0)}
                  className="p-[13px_20px] lg:p-[15px_30px] bg-yellow text-[15px] lg:text-[16px] rounded-md hover:bg-yellowHover transition duration-300"
                >
                  {props.button.text_1}
                </Link>
                <Link
                  href={props.link.to_2}
                  onClick={() => window.scrollTo(0, 0)}
                  className="p-[13px_20px] lg:p-[15px_30px] border-solid border-yellow border-[1px] text-[15px] lg:text-[16px] rounded-md hover:bg-yellowHover transition duration-300"
                >
                  {props.button.text_2}
                </Link>
              </div>
            </div>
          </div>
          <div className="right-content flex-1 flex justify-center items-center">
            <div className="image-hero flex items-center justify-center">
              <Image
                className="w-[270px] sm:w-[300px] md:w-full object-cover animate-spin-slow"
                src={props.banner.banner_image}
                alt="product_banner"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
