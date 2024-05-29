/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../component/fetchUser";
import apiLinks from "../pages/api";
import { toast } from "react-toastify";
import MainHeader from "../component/mainHeader";
import { useRouter } from "next/navigation";
import MainFooter from "../component/mainFooter";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Rewards() {
  const rewards = [
    {
      id: 1,
      name: "Zip Tote Basket",
      color: "White and black",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      imageAlt:
        "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
      price: "$140",
    },
    {
      id: 2,
      name: "Zip Tote Basket",
      color: "White and black",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      imageAlt:
        "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
      price: "$140",
    },
    {
      id: 3,
      name: "Zip Tote Basket",
      color: "White and black",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      imageAlt:
        "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
      price: "$140",
    },
    {
      id: 4,
      name: "Zip Tote Basket",
      color: "White and black",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      imageAlt:
        "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
      price: "$140",
    },
    {
      id: 5,
      name: "Zip Tote Basket",
      color: "White and black",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      imageAlt:
        "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
      price: "$140",
    },
    // More products...
  ];
  const [availableRewards, setAvailableRewards] = useState([]); // Add in rewards later
  const router = useRouter();

  const handleConfirmSubmit = () => {
    // Make a POST request to localhost:8000/user with the form data
    fetch(`http://${apiLinks.main}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingCart),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the server
        console.log(result);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    // Fetch rewards from the server
    fetch(`${apiLinks.main}/rewards`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // Update the rewards state with the fetched data
        setAvailableRewards(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        toast.error(
          "An error occurred with fetching rewards. Please try again."
        );
      });
  }, []); //Add in userid later

  return (
    <>
      <div className="bg-white">
        <MainHeader />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <header className="text-xl font-bold text-gray-900 flex justify-between items-center mt-8">
            <div>Available Rewards</div>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {rewards.map((reward) => (
              <div key={reward.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={reward.imageSrc}
                      alt={reward.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {reward.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{reward.color}</p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {reward.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 w-full"
                  >
                    Redeem<span className="sr-only">, {reward.name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MainFooter />
      </div>
    </>
  );
}
