import React, { useState, useEffect } from "react";
import menu from "../assets/Icons/menu.png";
import logo from "../assets/logo.png";
import logo2 from "../assets/mainlogo.jpg";
import cart from "../assets/Icons/bag.svg";
import arrow from "../assets/Icons/chevron_down.svg";
import store from "../assets/Icons/store.svg";
import search from "../assets/Icons/search.png";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { NavMenu } from "@/components/NavMenu";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItemFromCart } from "@/Redux/slices/cartSlice";
import { Cross1Icon } from "@radix-ui/react-icons";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const cartItemsCount = useSelector((state) => state.cart.cartItems.length);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.total);

  const handleRemoveItem = (index, price) => {
    dispatch(removeItemFromCart({ index, price }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_WHdWouX0xE9HcF", // Test key
      amount: total * 100,
      currency: "INR",
      name: "Your Shop",
      description: "Test Transaction",
      image: "https://your-logo-url",
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        dispatch(clearCart());
      },
      prefill: {
        name: "Nirav Nayi",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Check if Razorpay is loaded
    if (typeof Razorpay === "undefined") {
      alert("Razorpay is not loaded. Please check your Razorpay integration.");
      return;
    }

    const rzp = new Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      alert(`Payment failed: ${response.error.description}`);
    });
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  return (
    <div>
      <div className=" container w-screen flex gap-4 items-center justify-between   mt-4   ">
        <div className="w-56 max-[790px]:hidden  ">
          <img src={logo} alt="logo" />
        </div>
        <div className="w-24 full min-[790px]:hidden  ">
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

          <div
            onClick={() => {
              setOpen(true);
            }}
            className="relative cursor-pointer"
          >
            <img src={cart} alt="cart" className="ml-4  min-[790px]:w-7" />
            {cartItemsCount > 0 && (
              <span className=" absolute -top-[12px] -right-[28px] max-[690px]:-right-[15px] bg-red-500 text-white rounded-full w-5 h-5 text-sm flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <Cross1Icon className="w-10 h-6 " />
                        </button>
                      </div>
                    </div>

                    {cartItems.length > 0 ? (
                      <>
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((product, index) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      alt={product.name}
                                      src={product.image || not_found_image}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">₹{product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            handleRemoveItem(
                                              index,
                                              product.price
                                            )
                                          }
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-center mt-5 text-xl">
                        Your cart is empty.
                      </p>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          // href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm "
                          onClick={handlePayment}
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            onClick={handleClearCart}
                            className="font-medium text-black "
                          >
                            Clear Cart
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 50 50"
            onClick={()=> setIsSidebarOpen(true)}
          >
            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
          </svg>

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
