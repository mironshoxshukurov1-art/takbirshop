import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import CatalogSection from "./catalogsection";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./Components/Loginpage";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Profil from "./Components/Profil";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Payment from "./Components/Payment";
import SignUp from "./Components/Signup";
import ProductDetail from "./ProductDetail";
import Xaridlarim from "./Components/Xaridlarim";
import Savatcha from "./Components/Savatcha";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/About" element={<About />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/Xaridlarim" element={<Xaridlarim />} />
        <Route path="/Savatcha" element={<Savatcha />} />
      </Routes>
    </div>
  );
}
