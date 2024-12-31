/* eslint-disable @next/next/no-page-custom-font */

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ScrollTop from "../components/scrollTop/ScrollTop";
import ReduxProvider from "@/provider/ReduxProvider";
import { AOSInit } from "@/lib/AosInit"; //Aos Library

export const metadata = {
  title: "Restaurant",
  description:
    "Simple Restaurant Website react js app with ReactJS TailwindCSS Redux Toolkit for the client and NodeJS Supabase for the server",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AOSInit />
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <ReduxProvider>
          <ToastContainer style={{ width: "330px" }} />
          <Navbar />
          {children}
          <ScrollTop />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
