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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const categories = [
    { key: "payment", icon: <FaCreditCard />, path: "/payment" },
    { key: "cart", icon: <FaBoxOpen />, path: "/cart" },
    { key: "contact", icon: <FaPhoneAlt />, path: "/contact" },
    { key: "profile", icon: <CgProfile />, path: "/profile" },
    { key: "about", icon: <FaInfoCircle />, path: "/about" },
    { key: "signup", icon: <FaUserPlus />, path: "/signup" },
  ];

  const bottomNav = [
    { key: "home", icon: <HiOutlineHome size={22} />, path: "/" },
    { key: "favorite", icon: <FaHeart size={20} />, path: "/sevimli" },
    { key: "cart", icon: <HiOutlineShoppingBag size={22} />, path: "/cart" },
    { key: "profile", icon: <CgProfile size={22} />, path: "/profile" },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Body scroll lock when drawer open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ─── DESKTOP ─── */}
      <div className="hidden md:block">

        {/* Topbar */}
        <div className="bg-[#333] h-[45px] flex items-center justify-between px-10">
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-white" size={18} />
            <span className="text-white text-sm font-light">
              47, I. Karimov ko'chasi, Jizzax
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white text-sm">
              {t("topbar.contact_center")}:
              <strong className="ml-2">+998 90 123 45 67</strong>
            </span>

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-white border border-white/30 rounded px-2 py-1 text-sm"
            >
              <option value="uz" className="text-black">O'zb</option>
              <option value="en" className="text-black">ENG</option>
            </select>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex items-center px-10 h-20 border-b border-gray-200">

          <img src="/takbir.png" alt="Logo" className="h-[50px]" />

          {/* Categories Dropdown */}
          <div className="relative ml-12" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer font-medium"
            >
              <BiCategoryAlt size={20} />
              {t("navbar.categories")}
              <FaChevronRight
                size={12}
                className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </div>

            {isOpen && (
              <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50">
                {categories.map((cat) => (
                  <div
                    key={cat.key}
                    onClick={() => { navigate(cat.path); setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {cat.icon}
                    {t(`categories.${cat.key}`)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 mx-8 relative">
            <input
              type="text"
              placeholder={t("navbar.search")}
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div onClick={() => navigate("/profile")} className="flex flex-col items-center text-gray-600 hover:text-red-500 cursor-pointer">
              <CgProfile size={24} />
              <span className="text-xs">{t("navbar.profile")}</span>
            </div>
            <div onClick={() => navigate("/orders")} className="flex flex-col items-center text-gray-600 hover:text-red-500 cursor-pointer">
              <HiOutlineShoppingBag size={24} />
              <span className="text-xs">{t("navbar.orders")}</span>
            </div>
            <div onClick={() => navigate("/cart")} className="flex flex-col items-center text-gray-600 hover:text-red-500 cursor-pointer">
              <MdAddShoppingCart size={24} />
              <span className="text-xs">{t("navbar.cart")}</span>
            </div>
            <Link to="/login" className="flex items-center gap-2 text-sm hover:text-red-500">
              <LuLogIn size={18} />
              {t("navbar.login")}
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MOBILE ─── */}
      <div className="md:hidden sticky top-0 bg-white shadow-sm z-50">

        <div className="flex items-center justify-between px-4 py-2">
          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <MdMenu size={26} />
          </button>

          <img src="/takbir.png" alt="Logo" className="h-9" />

          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="uz">O'zb</option>
            <option value="en">ENG</option>
          </select>
        </div>

        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder={t("navbar.search")}
            className="w-full pl-3 pr-3 py-2 rounded-lg border bg-gray-100 text-sm"
          />
        </div>
      </div>

      {/* ─── LEFT DRAWER OVERLAY ─── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] md:hidden
          transition-opacity duration-300
          ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-white z-[101] md:hidden
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-red-500">
          <img src="/takbir.png" alt="Logo" className="h-8 brightness-0 invert" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Location strip */}
        <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b">
          <IoLocationSharp className="text-red-500 flex-shrink-0" size={16} />
          <span className="text-xs text-gray-600">47, I. Karimov ko'chasi, Jizzax</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {categories.map((cat, index) => (
            <div
              key={cat.key}
              onClick={() => {
                navigate(cat.path);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 hover:bg-red-50 hover:text-red-500 cursor-pointer group transition-colors duration-150"
              style={{
                animationDelay: `${index * 40}ms`,
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-400 group-hover:text-red-400 transition-colors text-lg">
                  {cat.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-500 transition-colors">
                  {t(`categories.${cat.key}`)}
                </span>
              </div>
              <FaChevronRight size={11} className="text-gray-300 group-hover:text-red-300 transition-colors" />
            </div>
          ))}
        </nav>

        {/* Login Button at Bottom */}
        <div className="p-5 border-t">
          <button
            onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors duration-200"
          >
            <LuLogIn size={18} />
            {t("navbar.login")}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            <strong>+998 90 123 45 67</strong>
          </p>
        </div>
      </div>

      {/* ─── BOTTOM NAV ─── */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center shadow md:hidden z-50">
        {bottomNav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <div
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-xs cursor-pointer transition-colors ${
                active ? "text-red-500 font-semibold" : "text-gray-400"
              }`}
            >
              {item.icon}
              {t(`bottom.${item.key}`)}
            </div>
          );
        })}
      </div>
    </>
  );
}