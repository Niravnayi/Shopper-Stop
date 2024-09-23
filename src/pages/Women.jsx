import React, { useEffect, useState } from "react";
import { ProductsCard } from "../components/ProductsCard";
import "../index.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const topsResponse = await fetch(
        "https://dummyjson.com/products/category/tops"
      );
      const bagResponse = await fetch(
        "https://dummyjson.com/products/category/womens-bags"
      );
      const shoesResponse = await fetch(
        "https://dummyjson.com/products/category/womens-shoes"
      );
      const watchResponse = await fetch(
       "https://dummyjson.com/products/category/womens-watches"
      );
      
      const topsData = await topsResponse.json();
      const bagData = await bagResponse.json();
      const shoesData = await shoesResponse.json();
      const watchData = await watchResponse.json();

      const combinedProducts = [
        ...(topsData.products || []),
        ...(shoesData.products || []),
        ...(bagData.products || []),
        ...(watchData.products || []),
      ];
      setProducts(combinedProducts);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full pt-32 min-h-screen container mx-auto ">
        <h1 className="text-4xl text-center font-semibold uppercase font-mono underline">
          Pro<span className="text-gray-600">du</span>cts
        </h1>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products && products.length > 0 ? (
            products.map((item) => (
              <div key={item.id}>
                <ProductsCard
                  title={item.title}
                  image={
                    item.images?.[0] ||
                    "https://plus.unsplash.com/premium_photo-1675088136456-4eb83fc5b827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  price={item.price}
                />
              </div>
            ))
          ) : (
            <div className="w-[90vw] flex justify-center">
              <div
                aria-label="Orange and tan hamster running in a metal wheel"
                role="img"
                class="wheel-and-hamster  "
              >
                <div class="wheel"></div>
                <div class="hamster">
                  <div class="hamster__body">
                    <div class="hamster__head">
                      <div class="hamster__ear"></div>
                      <div class="hamster__eye"></div>
                      <div class="hamster__nose"></div>
                    </div>
                    <div class="hamster__limb hamster__limb--fr"></div>
                    <div class="hamster__limb hamster__limb--fl"></div>
                    <div class="hamster__limb hamster__limb--br"></div>
                    <div class="hamster__limb hamster__limb--bl"></div>
                    <div class="hamster__tail"></div>
                  </div>
                </div>
                <div class="spoke"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
