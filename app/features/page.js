import {
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import NextIcon from "@/public/nextjsIcon.svg";
import SupabaseIcon from "@/public/supabaseIcon.svg";
import TailwindIcon from "@/public/tailwindIcon.svg";
import VercelIcon from "@/public/vercelIcon.svg";
import MainFooter from "../component/mainFooter";
import MainHeader from "../component/mainHeader";
import DashboardSS from "@/public/Dashboard-Screenshot.svg";

const primaryFeatures = [
  {
    name: "CRUD operations.",
    description:
      "Allows you to create, read, update, and delete data from the database.",
    icon: ArrowPathIcon,
  },
  {
    name: "User authentication.",
    description:
      "Allows users to sign up, log in, log out, and reset their password.",
    icon: ChevronRightIcon,
  },
  {
    name: "Server-side rendering.",
    description:
      "Optimizes your website for search engines and improves performance.",
    icon: ServerIcon,
  },
];
const secondaryFeatures = [
  {
    name: "Automatic backups.",
    description:
      "Automatically backs up your data to prevent data loss in case of an emergency.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure data storage.",
    description:
      "Stores your data in a secure database to prevent unauthorized access.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Mobile application pairing.",
    description:
      "Pairs with a mobile application to allow users to access your website on the go.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Features() {
  return (
    <div className="bg-white">
      <MainHeader />

      <main>
        {/* Feature section */}
        <div className="mx-auto mt-16 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
              <div className="lg:row-start-2 lg:max-w-md">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Primary features
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Our app offers a wide range of features to help you use it to
                  its full potential.
                </p>
              </div>
              {/* <img
                src="/Dashboard-Screenshot.png"
                alt="Dashboard screenshot"
                className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
                // width={10}
                // height={10}
              /> */}
              {/* <Image
                src="/Dashboard-Screenshot.png"
                alt="Dashboard screenshot"
                width={10}
                height={10}
                className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
              /> */}
              <DashboardSS className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none" />
              <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
                <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                  {primaryFeatures.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt className="ml-9 inline-block font-semibold text-white">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div
              className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
              aria-hidden="true"
            >
              <div
                className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-4 items-center justify-around">
            <div className="flex items-center justify-center h-16 w-full">
              <NextIcon className="h-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-16 w-full">
              <SupabaseIcon className="h-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-16 w-full">
              <TailwindIcon className="h-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-16 w-full">
              <VercelIcon className="h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything our app has to offer.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our app is packed with features to help you earn rewards while
              saving the planet. Here are a few of our favorites.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <a
                        href={feature.href}
                        className="text-sm font-semibold leading-6 text-indigo-600"
                      >
                        Learn more <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
