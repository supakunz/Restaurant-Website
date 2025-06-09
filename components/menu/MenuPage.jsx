/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Allmenu from "../assets/all_menu";
import CartMenu from "../cartMenu/CartMenu";
import LoadingCard from "../cartMenu/LoadingCard";

const MenuPage = () => {
  const [category, setCategory] = useState("All");
  const [rates, setRates] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleItems, setVisibleItems] = useState(8); // จำนวนรายการที่จะแสดงในครั้งแรก
  const [loading, setLoading] = useState(false); // ตัวแปรในการเช็คสถานะการโหลด

  // Filtered menu items
  const filteredMenu = Allmenu.filter((item) =>
    category === "All" ? item : item.category === category
  )
    .filter((item) => (rates === "All" ? item : item.rate === rates))
    .filter((item) =>
      search === "" ? item : item.name.toLowerCase().includes(search)
    );

  // Function to load more items with delay
  const loadMoreItems = () => {
    setLoading(true); // ตั้งค่า loading เป็น true ก่อนที่รายการจะถูกโหลด
    setTimeout(() => {
      setVisibleItems((prev) => prev + 8); // เพิ่มจำนวนรายการที่จะแสดง
      setLoading(false); // ตั้งค่า loading เป็น false หลังจากที่โหลดรายการเสร็จ
    }, 1000); // ดีเลย์ 1 วินาที (สามารถปรับเปลี่ยนได้)
  };

  //** การทำโหลด Items โดยใช้ IntersectionObserver โหลด Disqus **
  const observer = useRef(); //*ตำแหน่งอ้างอิง root element
  const lastItemRef = useRef(); //*target ที่เราต้องการ observe

  useEffect(() => {
    // ** สร้าง observerOptions object เป็นตัวกำหนด behavior ของการ scroll
    const options = {
      root: null, // null เป็นการมองว่า viewport เป็นตำแหน่งอ้างอิง
      rootMargin: "0px", //เป็นการขยายขนาดของกรอบ root ทำให้ callback เริ่มทำงานก่อน scroll จะถึงตัว element จริงๆ
      threshold: 1.0, // มีค่าตั้งแต่ 0 ถึง 1 #1 หมายถึง ให้เรียก callback เมื่อ element เข้ามาในกรอบ 100%
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
          //ตรวจสอบว่า isIntersection เป็น true ไหม # element target อยู่ภายใน viewport ไหม
          loadMoreItems(); // เมื่อเลื่อนถึงรายการสุดท้าย, โหลดรายการเพิ่มเติม
        }
      });
    };

    // ** สร้าง observer จาก IntersectionObserver
    const observerInstance = new IntersectionObserver(callback, options);
    // ส่ง parameter เข้าไป 2 ค่า
    // 1. callback # fuction ที่ถูกเรียกเมื่อ element เข้ามาอยู่ใน viewport
    // 2. options # object ที่เราสร้างไว้ในขั้นตอนก่อนหน้านี้
    if (lastItemRef.current) {
      observerInstance.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observerInstance.unobserve(lastItemRef.current);
      }
    };
  }, []);

  return (
    <section>
      <div className="container-section py-[100px]">
        <div className="flex justify-between flex-col sm:flex-row gap-6">
          <div className="flex gap-6 flex-col sm:flex-row">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="py-2 pl-2 pr-5 outline-none border-solid border-[2px] rounded-md"
            >
              <option value="All">Category (All)</option>
              <option value="Burger">Burger</option>
              <option value="Drink">Drink</option>
              <option value="Fried">Fried</option>
              <option value="Pizza">Pizza</option>
              <option value="Steak">Steak</option>
            </select>
            <select
              onChange={(e) => setRates(e.target.value)}
              className="py-2 pl-2 pr-8 outline-none border-solid border-[2px] rounded-md"
            >
              <option value="All">Rates (All)</option>
              <option value="0">0</option>
              <option value="0.5">0.5</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="p-2 outline-none border-solid border-[2px] w-full rounded-l-md"
              type="text"
              placeholder="Search name here..."
            />
            <button className="bg-yellow text-[20px] h-[43px] w-[40px] rounded-r-md">
              <i className="bx bx-search-alt-2"></i>
            </button>
          </div>
        </div>

        {/* ------------- Product Item ------------ */}
        <div>
          {filteredMenu.length === 0 ? (
            <div className="text-center text-gray-500 flex justify-center items-center min-h-[58.3vh]">
              No items found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[3rem] sm:mt-[4rem] gap-6 min-h-[50vh]">
              {filteredMenu.slice(0, visibleItems).map((item, index) => (
                <div key={item.id} className="relative">
                  {/* Display a loading card before item */}
                  <CartMenu
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    details={item.details}
                    category={item.category}
                    price={item.price}
                    number={0}
                  />
                </div>
              ))}
              {loading && visibleItems < filteredMenu.length && (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              )}
            </div>
          )}
          <div ref={lastItemRef}></div>
          {/* target ที่เราต้องการ observe */}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
