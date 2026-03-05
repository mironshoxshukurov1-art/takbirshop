import React from "react";
import { useState, useRef } from "react";
import { FiUser, FiSettings, FiBell, FiLock, FiUpload, FiTrash2, FiChevronRight, FiCalendar, FiChevronDown, FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const navItems = [
  { id: "personal", label: "Personal Info", icon: FiUser },
  { id: "settings", label: "Settings", icon: FiSettings },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "security", label: "Security", icon: FiLock },
];

export default function Profil() {
  const [active, setActive] = useState("personal");
  const [photo, setPhoto] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    dob: "",
    country: "",
    phone: "",
    address: "",
  });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    fileRef.current.value = "";
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 1200);
  };

  const isFormTouched = Object.values(form).some((v) => v) || photo;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
        <Link to={'/'}>
          <span className="hover:text-gray-600 cursor-pointer">Home</span>
        </Link>
        <FiChevronRight size={12} />
        <span className="text-gray-700 font-medium">My Profile</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>

      <div className="flex gap-6 items-start">
        <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                active === id
                  ? "bg-rose-400 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>

          <div className="flex items-center gap-4 mb-8">
            <div
              onClick={() => fileRef.current.click()}
              className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shrink-0"
            >
              {photo ? (
                <img
                  src={photo}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser size={32} className="text-gray-400" />
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />

            <button
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              <FiUpload size={14} />
              Upload
            </button>

            {photo && (
              <button
                onClick={removePhoto}
                className="flex items-center gap-2 border border-gray-200 hover:border-red-300 hover:text-red-400 text-gray-500 text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                <FiTrash2 size={14} />
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Ivan"
              required
            />
            <Field
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Norris"
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ivannorris11@gmail.com"
              required
            />
            <Field
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="ivan.norris"
              required
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date of Birth <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <FiCalendar
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Country <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all bg-gray-50"
                >
                  <option value="">Select country</option>
                  {[
                    "Brazil",
                    "United States",
                    "United Kingdom",
                    "Germany",
                    "France",
                    "Japan",
                    "Australia",
                    "Canada",
                    "India",
                    "China",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <FiChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+17840363856"
              required
            />

            <div className="md:col-span-2">
              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Craile Cottage, Coupledyke Lane, Kirton, Brazil"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={!isFormTouched || saving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isFormTouched && !saving
                  ? saved
                    ? "bg-green-500 text-white"
                    : "bg-gray-900 hover:bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving...
                </>
              ) : saved ? (
                <>
                  <FiCheck size={15} />
                  Changes Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-all bg-gray-50 placeholder-gray-300 ${
          focused ? "border-rose-300 ring-2 ring-rose-50" : "border-gray-200"
        }`}
      />
    </div>
  );
}
