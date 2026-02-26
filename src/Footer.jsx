import { FaTelegramPlane, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 font-sans">

      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap gap-16">

        <div className="min-w-[180px] max-w-[220px]">
          <div className="mb-4">
            <img src="/takbir.png" alt="Takbir Shop" className="h-12 object-contain" />
          </div>
          <p className="text-xs text-gray-400 mb-2">Qo'llab quvvatlash raqami</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
            +998 90 123 45 67
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IoLocationOutline size={16} className="text-gray-500 shrink-0" />
              <span className="text-sm text-gray-600">Somewhere, Toshkent</span>
            </div>
            <div className="flex items-center gap-2">
              <IoMailOutline size={16} className="text-gray-500 shrink-0" />
              <a href="mailto:info@takbirshop.uz" className="text-sm text-gray-600 hover:text-[#8B1A1A] transition-colors">
                info@takbirshop.uz
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[#8B1A1A] mb-5">Ma'lumot</h3>
          <div className="flex flex-wrap gap-16">
            <ul className="flex flex-col gap-3">
              {[
                { label: "Biz haqimizda", to: "/About" },
                { label: "Bo'sh ish o'rinlari", to: "#" },
                { label: "Tovarlarni almashtirish va to'lovni qaytarish", to: "#" },
                { label: "Yordam", to: "#" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-gray-600 hover:text-[#8B1A1A] transition-colors leading-snug block max-w-[200px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {[
                "Bonuslar",
                "Aksiyalar",
                "Servis markazlari",
              ].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-600 hover:text-[#8B1A1A] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-gray-400">(c) 2022-2023. OOO "Takbir shop"</span>

          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Ommaviy sfera</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Mahfiylik siyoyati</a>
          </div>

          <div className="flex items-center gap-4">
            {[FaTelegramPlane, FaFacebookF, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="text-gray-400 hover:text-[#8B1A1A] transition-colors flex items-center">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}