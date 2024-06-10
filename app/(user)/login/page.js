/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiLinks from "@/app/pages/api";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/navigation";
import GreenAppIcon from "@/public/greenAppIcon.svg";

/* eslint-disable @next/next/no-img-element */

export default function Login() {
  //check if correct domain
  if(!window.location.href.includes(apiLinks.main)){
    window.location.replace(apiLinks.main+"/login")
  }

  const supabase = createClient();
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDetails);

    const { error } = await supabase.auth.signInWithPassword(formDetails);
    if (error) {
      console.log(error);
      if (error.message === "Email not confirmed") {
        toast.info("Please check your inbox for verification email");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } else {
      toast.success("Login successful, redirecting...");
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex justify-center">
          <GreenAppIcon className="h-32 w-64" />
        </div>

        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
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
                Password
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
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/signup-by-email"
                className="inline-flex items-center font-medium text-indigo-600 hover:underline"
              >
                Email Signup
                <svg
                  className="w-4 h-4 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
