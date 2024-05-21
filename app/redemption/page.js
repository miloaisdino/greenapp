/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { fetchCurrentUser } from "../component/fetchUser";
import apiLinks from "../pages/api";
import Header from "../component/header";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Redemption() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Tuple",
      imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
      lastInvoice: {
        date: "December 13, 2022",
        dateTime: "2022-12-13",
        amount: "$2,000.00",
        status: "Overdue",
      },
    },
    {
      id: 2,
      name: "SavvyCal",
      imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
      lastInvoice: {
        date: "January 22, 2023",
        dateTime: "2023-01-22",
        amount: "$14,000.00",
        status: "Paid",
      },
    },
    {
      id: 3,
      name: "Reform",
      imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
      lastInvoice: {
        date: "January 23, 2023",
        dateTime: "2023-01-23",
        amount: "$7,600.00",
        status: "Paid",
      },
    },
  ]);
  const [formDetails, setFormDetails] = useState({
    image_url: "",
    description: "",
  });
  const products = [
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

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // Make a POST request to localhost:8000/user with the form data
    fetch(`http://${apiLinks.main}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails),
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
    toggleModal();
  };

  useEffect(() => {
    async function getUser() {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    }

    getUser();
  }, []); //Add in userid later

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Available Rewards</h2>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={product.href}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to bag<span className="sr-only">, {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )
    </>
  );
}
