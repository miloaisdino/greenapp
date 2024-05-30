/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCurrentUser } from "../../component/fetchUser";
import apiLinks from "../../pages/api";
import { toast } from "react-toastify";
import ConfirmationModal from "./confirmationModal";
import { createClient } from "@/lib/supabase/component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Redemption() {
  const [user, setUser] = useState(null);
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const supabase = createClient();

  const toggleModal = (e) => {
    setShowModal(!showModal);
  };

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

    setShowModal(false);
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const { data, error } = await supabase.from("reward").select("*");
        if (error) {
          throw new Error(error.message);
        }
        setAvailableRewards(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        toast.error(
          "An error occurred while fetching rewards. Please try again."
        );
      }
    };
    fetchRewards();
  }, []);

  return (
    <>
      <div className="bg-white">
        {showModal && (
          <ConfirmationModal
            open={showModal}
            handleConfirmSubmit={handleConfirmSubmit}
            handleCancelSubmit={handleCancelSubmit}
            toggleModal={toggleModal}
            content={
              "Confirm purchase of " +
              selectedItem.name +
              " for " +
              selectedItem.price +
              "?"
            }
          />
        )}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <header className="text-xl font-bold text-gray-900 flex justify-between items-center">
            <div>Available Rewards</div>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {availableRewards.map((reward) => (
              <div key={reward.reward_id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={reward.image_url}
                      alt={"Cannot find"}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {reward.name}
                    </h3>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {reward.points_cost} points
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
      </div>
    </>
  );
}
