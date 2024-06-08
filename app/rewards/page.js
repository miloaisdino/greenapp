"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainHeader from "../component/mainHeader";
import { useRouter } from "next/navigation";
import MainFooter from "../component/mainFooter";
import { createClient } from "@/lib/supabase/component";
import { CldImage } from "next-cloudinary";

export default function Rewards() {
  const [availableRewards, setAvailableRewards] = useState([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const { data, error } = await supabase.from("reward").select("*");
        if (error) {
          throw new Error(error.message);
        }
        setAvailableRewards(data);
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
        <MainHeader />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <header className="text-xl font-bold text-gray-900 flex justify-between items-center mt-8">
            <div>Available Rewards</div>
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
        <MainFooter />
      </div>
    </>
  );
}
