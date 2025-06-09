/* eslint-disable @next/next/no-page-custom-font */

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import "./globals.css";

export default function FoodLayout({ children }) {
  return (
    <body className="antialiased">
      <Navbar />
      <main>{children}</main>
      <ScrollTop />
      <Footer />
    </body>
  );
}
