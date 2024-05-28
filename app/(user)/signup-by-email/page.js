/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiLinks from "@/app/pages/api";
import Image from "next/image";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/navigation";
import GreenAppIcon from "@/public/greenAppIcon.svg";

/* eslint-disable @next/next/no-img-element */

export default function Login() {
  const supabase = createClient();
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDetails);

    const { error, data } = await supabase.auth.signUp(formDetails);
    if (error) {
      console.error(error);
      toast.error(error.message);
    } else {
      console.log(data);
      if (data.user.identities.length > 0) {
        toast.success("Signup successful, please check email verification...");
      } else {
        toast.warning("Email already exists");
      }
    }
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex justify-center">
          <GreenAppIcon className="h-32 w-64" />
        </div>

        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to the club!
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formDetails.email}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, email: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Create password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formDetails.password}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, password: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
              <a
                type="button"
                href="/login"
                className="flex w-full justify-center rounded-lg px-3 py-1.5 text-sm
                                    font-semibold leading-6 text-gray-900 mt-2.5
                                    focus:outline-none bg-white border border-gray-200
                                    hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100
                                    dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
                                    dark:hover:text-white dark:hover:bg-gray-700"
              >
                Go Back
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
