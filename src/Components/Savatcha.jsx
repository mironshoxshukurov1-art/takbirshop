import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { MyContext } from "../context/MyContext";

export default function Savatcha() {
  const { cart, removeFromCart, updateQty } = useContext(MyContext);

  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen" style={{ background: "#f4f3f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-up { animation: slideUp 0.35s cubic-bezier(.23,1,.32,1) both; }
        .qty-btn {
          width:32px; height:32px; border-radius:10px;
          border:1.5px solid #e5e7eb; display:flex;
          align-items:center; justify-content:center;
          transition:all 0.15s; background:white;
        }
        .qty-btn:hover:not(:disabled) { border-color:#111; background:#111; color:white; }
        .qty-btn:disabled { opacity:0.3; cursor:not-allowed; }
      `}</style>

      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">

        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/Cart"
            className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
          >
            <FaArrowLeft size={13} className="text-gray-500" />
          </Link>
          <h1 className="syne text-2xl font-bold text-gray-900">
            Savat
            {totalItems > 0 && (
              <span className="ml-2 text-base font-normal text-gray-400">
                ({totalItems} ta mahsulot)
              </span>
            )}
          </h1>
        </div>

        {/* Bo'sh savat */}
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 slide-up">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
              <FaShoppingBag size={32} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-medium">Savat bo'sh</p>
            <Link to="/Cart">
              <button className="bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition">
                Xarid qilishni boshlash
              </button>
            </Link>
          </div>
        )}

        {/* Savat mahsulotlari */}
        {cart.length > 0 && (
          <>
            <div className="flex flex-col gap-3 mb-6">
              {cart.map((item, i) => (
                <div
                  key={item.id}
                  className="slide-up bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-xl bg-gray-50 hover:opacity-80 transition"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">
                      {item.brand || item.category}
                    </p>
                    <p className="text-base font-bold text-gray-900 mt-1">
                      ${(item.price * item.qty).toFixed(2)}
                      {item.qty > 1 && (
                        <span className="text-xs font-normal text-gray-400 ml-1">
                          (${item.price} × {item.qty})
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="syne text-sm font-bold w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      disabled={item.qty >= item.stock}
                    >
                      <FiPlus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-50 hover:bg-rose-100 transition ml-1"
                    >
                      <FaTrash size={12} className="text-rose-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Jami narx */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-10 slide-up">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Mahsulotlar ({totalItems})
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  ${totalPrice}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5 pt-3 border-t border-gray-100">
                <span className="syne text-base font-bold text-gray-900">
                  Jami:
                </span>
                <span className="syne text-2xl font-bold text-gray-900">
                  ${totalPrice}
                </span>
              </div>
              <Link to="/payment">
                <button className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-semibold hover:bg-gray-700 transition text-sm">
                  Buyurtma berish →
                </button>
              </Link>
              <Link to="/Cart">
                <button className="w-full mt-2 text-sm text-gray-400 hover:text-gray-700 transition py-2">
                  ← Xarid qilishni davom ettirish
                </button>
              </Link>
            </div>
          </>
        )}

      </div>

      <Footer />
    </div>
  );
}