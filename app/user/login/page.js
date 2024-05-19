/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import apiLinks from "@/app/pages/api";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a data object with the form inputs
    const data = {
      email,
      password,
    };

    // Make a POST request to localhost:8000/user with the form data
    fetch(`http://${apiLinks.main}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex justify-center">
          <Image src="/appIcon.png" alt="Logo" width={200} height={200} />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            Don't have an account?{" "}
            <a
              href="/user/registration"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}