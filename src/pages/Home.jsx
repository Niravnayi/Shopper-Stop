import React from "react";
import image1 from "../assets/Home_images/image1.avif";
import image2 from "../assets/Home_images/image2.avif";
import image3 from "../assets/Home_images/image3.avif";
import image4 from "../assets/Home_images/image4.avif";
import image5 from "../assets/Home_images/image5.avif";
import image6 from "../assets/Home_images/image6.avif";
import image7 from "../assets/Home_images/image7.avif";
import image8 from "../assets/Home_images/image8.avif";
import add1 from "../assets/Add_images/icici.avif";
import add2 from "../assets/Add_images/STYLE.avif";
import add3 from "../assets/Add_images/hdfc.avif";
import add4 from "../assets/Add_images/new.avif";
import brand1 from "../assets/Brands/MAC.avif";
import brand2 from "../assets/Brands/Puma.avif";
import brand3 from "../assets/Brands/billim.avif";
import brand4 from "../assets/Brands/Biba.avif";
import brand5 from "../assets/Brands/Static.avif";
import brand6 from "../assets/Brands/Autumn.avif";
import brand7 from "../assets/Brands/Fashore.avif";
import brand8 from "../assets/Brands/adidas.avif";
import add10 from "../assets/add10.avif";
import watch1 from "../assets/watches/watch1.avif";
import watch2 from "../assets/watches/watch2.avif";
import watch3 from "../assets/watches/watch3.avif";
import watch4 from "../assets/watches/watch4.avif";
import watch5 from "../assets/watches/watch5.avif";
import watch6 from "../assets/watches/watch6.avif";
import watch7 from "../assets/watches/watch7.avif";
import watch8 from "../assets/watches/watch8.avif";
import banner1 from "../assets/banner/banner1.avif";
import banner2 from "../assets/banner/banner2.avif";

import Carousel from "@/components/Carousel";
import MultiCarousel from "@/components/MultiCarousel";

const Home = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];
  const add = [add1, add2, add3, add4];
  const brand = [
    brand1,
    brand2,
    brand3,
    brand4,
    brand5,
    brand6,
    brand7,
    brand8,
  ];
  const watches = [
    watch1,
    watch2,
    watch3,
    watch4,
    watch5,
    watch6,
    watch7,
    watch8,
  ];

  const banner = [banner1, banner2];

  return (
    <div className="my-2 container   ">
      <Carousel images={images} />

      <Carousel images={add} />

      <div className="mt-5 pt-3 flex flex-col ">
        <h3 className=" text-4xl font-bold text-center font-mono   ">
          <span className="text-gray-400 underline">Featured</span> Brands
        </h3>
        <Carousel images={brand} />
      </div>
      <div>
        <MultiCarousel images={images} />
      </div>

      <div className="mt-5 pt-3 flex flex-col ">
        <h3 className=" text-4xl font-bold text-center font-sans text-gray-400  ">
          What's <span className="text-black underline">Trending</span> In
        </h3>
        <Carousel images={brand} />
      </div>
      <div className=" mt-20">
        <img src={add10} alt="add" />
      </div>

      <div className="mt-5 pt-3 flex flex-col ">
        <h3 className=" text-4xl font-bold text-center font-sans   ">
          Timeless
          <span className="text-gray-400 underline"> Tickers</span>
        </h3>     
        <Carousel images={watches} />
      </div>

      <div className="mt-5 pt-3 flex flex-col  ">
        <h3 className=" text-4xl font-bold text-gray-400 text-center font-sans    ">
          Season's
          <span className="text-black underline"> Latest</span> Style
        </h3>
        <Carousel images={banner} />
      </div>
    </div>
  );
};

export default Home;
