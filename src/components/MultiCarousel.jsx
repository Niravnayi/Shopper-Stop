// CarouselComponent.jsx

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand1 from "../assets/sales_brands/brand1.avif";
import brand2 from "../assets/sales_brands/brand2.avif";
import brand3 from "../assets/sales_brands/brand3.avif";
import brand4 from "../assets/sales_brands/brand4.avif";
import brand5 from "../assets/sales_brands/brand5.avif";
import brand6 from "../assets/sales_brands/brand6.avif";
import brand7 from "../assets/sales_brands/brand7.avif";
import brand8 from "../assets/sales_brands/brand8.avif";

const MultiCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto my-10">
      <h3 className=" text-4xl font-bold text-center font-sans mb-5   ">
        Our <span className="text-gray-400 underline">Homegrown</span> Brands
      </h3>
      <Slider {...settings}>
        {[brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8].map(
          (brand, index) => (
            <div
              className="carousel-item group relative p-2 transition-transform duration-300 ease-in-out"
              key={index}
              tabIndex={0}
            >
              <div className="image-container overflow-hidden rounded-lg">
                <img
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="carousel-image w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <p className="mt-2 text-center text-lg font-semibold">
                UP TO 50% OFF
              </p>

              {/* Overlay effect for non-hovered images */}
              <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default MultiCarousel;
