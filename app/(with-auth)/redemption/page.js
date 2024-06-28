/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCurrentUser } from "../../component/fetchUser";
import apiLinks from "../../pages/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./confirmationModal";
import { createClient } from "@/lib/supabase/component";
import { CldImage } from "next-cloudinary";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Redemption() {
  const [availableRewards, setAvailableRewards] = useState([]); // Add in rewards later
  const [selectedItem, setSelectedItem] = useState({});
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const supabase = createClient();

  const toggleModal = (e) => {
    setShowModal(!showModal);
  };

  const handleConfirmSubmit = () => {
    // Make a POST request to localhost:8000/user with the form data
    fetch(`${apiLinks.main}/api/redemption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reward_id: selectedItem.reward_id }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the server
        //console.log(result);
        if (result.error) {
          toast.error(result.error);
        } else {
          setShowModal(false);
          toast.success(
            <div>
              Redemption successful!
              <br />
              You will receive an email within <b>24 hours</b> with details
            </div>
          );
          //update client side balances
          fetchUser();
        }
      })
      .catch((error) => {
        // Handle any fetch errors
        setShowModal(false);
        console.error(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  const fetchUser = async () => {
    try {
      const data = await fetchCurrentUser();
      setUserData(data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching user data.");
    }
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
    fetchUser();
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
              "Confirm redemption of " +
              selectedItem.name +
              " for " +
              selectedItem.price +
              " points?"
            }
            data={selectedItem}
            user={userData}
          />
        )}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <header className="flex justify-between items-center">
            <div className="text-xl font-bold text-gray-900">
              Available Rewards
            </div>
            <div className="float-right pb-1 text-base text-gray-500">
              Current Points: {userData.balances?.current_points}
            </div>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {availableRewards.map((reward) => (
              <div key={reward.reward_id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <CldImage
                      src={reward.image_url}
                      alt={reward.name || "Reward not available"}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
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
                      setSelectedItem({
                        reward_id: reward.reward_id,
                        name: reward.name,
                        price: reward.points_cost,
                      });
                      toggleModal();
                    }}
                    className="relative flex items-center justify-center rounded-md border
                        border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900
                        hover:bg-gray-200 w-full disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                    disabled={
                      userData.balances?.current_points < reward.points_cost
                    }
                  >
                    {userData.balances?.current_points < reward.points_cost
                      ? "Insufficient Points"
                      : "Redeem"}
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
