import React, { useState } from "react";
import menu from "../assets/Icons/menu.png";
import logo from "../assets/logo.png";
import logo2 from "../assets/mainlogo.jpg";
import cart from "../assets/Icons/bag.svg";
import arrow from "../assets/Icons/chevron_down.svg";
import store from "../assets/Icons/store.svg";
import search from "../assets/Icons/search.png";

import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { NavMenu } from "@/components/NavMenu";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <div className=" container w-screen flex gap-4 items-center justify-between   mt-4   ">
        <div className="w-56 max-[690px]:hidden  ">
          <img src={logo} alt="logo" />
        </div>
        <div className="w-24 full min-[690px]:hidden  ">
          <img src={logo2} alt="logo2" />
        </div>
        <div className="w-full flex justify-center relative max-[790px]:hidden  ">
          <Input
            className="w-[80%] rounded-full bg-[#f0f0f0] border-none p-6 font-sans  "
            placeholder="What are you looking for?"
          />
          <img
            src={search}
            alt="search"
            className="h-6 absolute left-[83%] top-[25%] cursor-pointer"
          />
        </div>
        <div className="flex gap-2">
          <Link to="/auth/" className="flex items-center">
            Login
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </Link>

          <img src={store} alt="store" className="ml-4" />
          <img src={cart} alt="cart" className="ml-4" />
        </div>
      </div>
      <div className="w-screen flex gap-4 justify-center relative min-[790px]:hidden px-[2%]  ">
        <Input
          className="w-[80%] rounded-full bg-[#f0f0f0] border-none p-6 font-sans  "
          placeholder="What are you looking for?"
        />
        <img
          src={search}
          alt="search"
          className="h-6 absolute left-[73%] top-[25%] cursor-pointer"
        />

        <div>
          <img
            src={menu}
            alt="menu"
            className="w-10 cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />

          <div
            className={`fixed top-0 right-0 h-full w-64 bg-black z-50 shadow-lg transition-transform duration-700 ease-in-out transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ transition: "transform 0.7s ease-in-out" }}
          >
            <button
              className="absolute h-12 w-12 top-4 right-4 text-white text-2xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              &times;
            </button>

            <nav className="mt-16 px-4">
              <ul className="space-y-4 list-none">
                <li>
                  <Link to="/men" className="text-lg text-white font-medium">
                    MEN
                  </Link>
                </li>
                <li>
                  <Link to="/women" className="text-lg text-white font-medium">
                    WOMEN
                  </Link>
                </li>
                <li>
                  <Link to="kids" className="text-lg text-white font-medium">
                    KIDS
                  </Link>
                </li>
                <li>
                  <Link to="/beauty" className="text-lg text-white font-medium">
                    BEAUTY
                  </Link>
                </li>
                <li>
                  <Link to="/gifts" className="text-lg text-white font-medium">
                    GIFTS
                  </Link>
                </li>
                <li>
                  <Link to="brands" className="text-lg text-white font-medium">
                    BRANDS
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-lg text-white font-medium">
                    Documentation
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="font-Josefin w-full container">
        <NavMenu />
      </div>
    </div>
  );
};

export default Navbar;
