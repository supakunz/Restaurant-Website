import bg_image_1 from "../assets/image/banner1.webp";
import banner_image_1 from "../assets/image/imgSpinBanner1.webp";
import bg_image_2 from "../assets/image/banner2.webp";
import banner_image_2 from "../assets/image/imgSpinBanner2.webp";
import bg_image_3 from "../assets/image/banner3.webp";
import banner_image_3 from "../assets/image/imgSpinBanner3.webp";

let hero_product = [
  {
    id: 1,
    content: "Enjoy Our Delicious Meal",
    button: {
      text_1: "Book a table",
      text_2: "Menu",
    },
    link: {
      to_1: "/food/booking",
      to_2: "/food/menu",
    },
    banner: {
      banner_image: banner_image_1,
      bg_image: bg_image_1,
    },
  },
  {
    id: 2,
    content: "Sign up for free to order food",
    button: {
      text_1: "Sign up",
      text_2: "Login",
    },
    link: {
      to_1: "/food/signup",
      to_2: "/food/login",
    },
    banner: {
      banner_image: banner_image_2,
      bg_image: bg_image_2,
    },
  },
  {
    id: 3,
    content: "Experienced chefs ready to serve",
    button: {
      text_1: "Our Team",
      text_2: "Service",
    },
    link: {
      to_1: "/food/ourteam",
      to_2: "/food/service",
    },
    banner: {
      banner_image: banner_image_3,
      bg_image: bg_image_3,
    },
  },
];

export default hero_product;
