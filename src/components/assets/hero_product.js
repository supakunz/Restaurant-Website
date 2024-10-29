import bg_image_1 from '../assets/image/banner1.webp'
import banner_image_1 from '../assets/image/imgSpinBanner1.webp'
import bg_image_2 from '../assets/image/banner2.webp'
import banner_image_2 from '../assets/image/imgSpinBanner2.webp'
import bg_image_3 from '../assets/image/banner3.webp'
import banner_image_3 from '../assets/image/imgSpinBanner3.webp'


let hero_product = [
  {
    id: 1,
    content: "Enjoy Our Delicious Meal",
    button: {
      text_1: "Book a table",
      text_2: "Menu"
    },
    link: {
      to_1: "/booking",
      to_2: "/menu"
    },
    banner: {
      banner_image: banner_image_1,
      bg_image: bg_image_1
    }
  },
  {
    id: 2,
    content: "Sing up for free to order food",
    button: {
      text_1: "Sing up",
      text_2: "Login"
    },
    link: {
      to_1: "/singup",
      to_2: "/login"
    },
    banner: {
      banner_image: banner_image_2,
      bg_image: bg_image_2
    }
  },
  {
    id: 3,
    content: "Experienced chefs ready to serve",
    button: {
      text_1: "Our Team",
      text_2: "Service"
    },
    link: {
      to_1: "/ourteam",
      to_2: "/service"
    },
    banner: {
      banner_image: banner_image_3,
      bg_image: bg_image_3
    }
  }
]

export default hero_product;