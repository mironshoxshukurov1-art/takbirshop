import { changeLanguage } from "i18next";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiCategoryAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {
  FaChevronRight,
  FaCreditCard,
  FaBoxOpen,
  FaPhoneAlt,
  FaInfoCircle,
  FaUserPlus,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineShoppingBag, HiOutlineHome } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { MdAddShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";


const categories = [
  { name: "Payment", icon: <FaCreditCard />, path: "/payment" },
  { name: "Cart", icon: <FaBoxOpen />, path: "/cart" },
  { name: "Contact", icon: <FaPhoneAlt />, path: "/contact" },
  { name: "Profil", icon: <CgProfile />, path: "/profil" },
  { name: "About", icon: <FaInfoCircle />, path: "/about" },
  { name: "Signup", icon: <FaUserPlus />, path: "/signup" },
];

const bottomNav = [
  { name: "Asosiy", icon: <HiOutlineHome size={22} />, path: "/" },
  { name: "Sevimli", icon: <FaHeart size={20} />, path: "/sevimli" },
  { name: "Savatcha", icon: <HiOutlineShoppingBag size={22} />, path: "/cart" },
  { name: "Profil", icon: <CgProfile size={22} />, path: "/profile" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {t, i18n} = useTranslation()

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">

        {/* Top Bar */}
        <div className="bg-[#333] h-[45px] flex items-center justify-between px-10">
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-white" size={18} />
            <span className="text-white text-sm font-light">
              47, I. Karimov ko'chasi, Jizzax
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white text-xs">
              Aloqa markazi:
              <strong className="text-sm ml-1">+998 90 123 45 67</strong>
            </span>


            <div className="flex items-center border border-white/30 rounded px-2 py-1">
              <select className="appearance-none bg-transparent text-white text-sm outline-none cursor-pointer">
                <option onClick={()=>{changeLanguage(uz)}} className="text-black">O'zb</option>
                <option onClick={()=>{changeLanguage(eng)}} className="text-black">ENG</option>
              </select>
            </div>




          </div>
        </div>

        
        <div className="flex items-center px-10 h-20 border-b border-gray-200">

          <img src="/takbir.png" alt="Takbir" className="h-[50px]" />

          {/* Dropdown */}
          <div className="relative ml-12" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer font-medium"
            >
              <BiCategoryAlt size={20} />
              Bo'limlar
              <FaChevronRight
                size={12}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                {categories.map(cat => (
                  <div
                    key={cat.name}
                    onClick={() => {
                      navigate(cat.path);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 mx-8 relative">
            <input
              type="text"
              placeholder="Mahsulotni izlash"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#aaa"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            {[
              { icon: <CgProfile size={26} />, label: "Profil", path: "/profile" },
              { icon: <HiOutlineShoppingBag size={26} />, label: "Xaridlarim", path: "/orders" },
              { icon: <MdAddShoppingCart size={26} />, label: "Savatcha", path: "/cart" },
            ].map(item => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center text-gray-600 hover:text-red-500 cursor-pointer transition"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </div>
            ))}

            <Link
              to="/login"
              className="flex items-center gap-2 text-sm hover:text-red-500 transition"
            >
              <LuLogIn size={18} />
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden sticky top-0 bg-white shadow-sm z-50">

        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </button>

          <img src="/takbir.png" alt="Takbir" className="h-9" />

          <select className="border rounded px-2 py-1 text-sm">
            <option>O'zb</option>
            <option>ENG</option>
          </select>
        </div>

        <div className="px-4 pb-3 relative">
          <input
            type="text"
            placeholder="Mahsulotni izlash"
            className="w-full pl-10 pr-3 py-2 rounded-lg border bg-gray-100 text-sm"
          />
        </div>

        {mobileMenuOpen && (
          <div className="border-t">
            {categories.map(cat => (
              <div
                key={cat.name}
                onClick={() => {
                  navigate(cat.path);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-5 py-3 text-sm border-b hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center shadow md:hidden">
        {bottomNav.map(item => {
          const active = location.pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-xs cursor-pointer transition ${
                active ? "text-red-500 font-semibold" : "text-gray-400"
              }`}
            >
              {item.icon}
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}