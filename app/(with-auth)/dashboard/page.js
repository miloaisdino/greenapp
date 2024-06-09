/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useEffect, useState } from "react";
import { ArrowUpCircleIcon, PlusSmallIcon } from "@heroicons/react/20/solid";
import { fetchCurrentUser } from "../../component/fetchUser";
import apiLinks from "@/app/pages/api";
import SubmissionModal from "./submissionModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stats = [
  {
    name: "Lifetime Points",
    value: "925000",
  },
  {
    name: "Current Points",
    value: "175000",
  },
  {
    name: "Highest Ranking",
    value: "#2",
  },
  {
    name: "Current Ranking",
    value: "#4",
  },
];
const statuses = {
  Successful: "text-green-700 bg-green-50 ring-green-600/20",
  Pending: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Failed: "text-red-700 bg-red-50 ring-red-600/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formDetails, setFormDetails] = useState({
    points_awarded: 0,
    image_url: "",
    description: "",
    user_id: "",
    status: 0,
  });
  const [groupedDays, setGroupedDays] = useState([]);
  // const [redemption, setRedemption] = useState([]);

  const groupSubmissionsByDay = (submissions) => {
    const grouped = {};
    submissions.forEach((submission, index) => {
      submission.index = index + 1;
      const date = submission.submission_date.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(submission);
    });

    const days = Object.keys(grouped)
      .map((date) => {
        const isToday = date === new Date().toISOString().split("T")[0];
        const isYesterday =
          date === new Date(Date.now() - 86400000).toISOString().split("T")[0];

        return {
          date: isToday ? "Today" : isYesterday ? "Yesterday" : "Others",
          dateTime: date,
          transactions: grouped[date].map((submission) => ({
            id: submission.submission_id,
            invoiceNumber: submission.index,
            amount: submission.points_awarded,
            href: "#",
            status:
              submission.status == 0
                ? "Pending"
                : submission.status == 1
                ? "Successful"
                : "Failed",
            description: submission.description,
            icon: ArrowUpCircleIcon,
          })),
        };
      })
      .sort((a, b) => {
        // Sort by date
        if (a.date === "Others") return 1;
        if (b.date === "Others") return -1;
        return 0;
      });
    return days;
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(`${apiLinks.main}/api/recycle/` + user.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      if (!response.ok) {
        console.log(formDetails);
        throw new Error("Failed to submit");
      }

      const result = await response.json();

      setSubmissions((prevSubmissions) => [...prevSubmissions, result.data[0]]);
      const groupedDays = groupSubmissionsByDay(submissions);
      setGroupedDays(groupedDays);
      setFormDetails((prevFormDetails) => ({
        ...prevFormDetails,
        image_url: "",
        description: "",
      }));

      // setShowModal(false);
      toast.success("Submission successful");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    async function withUser() {
      const currentUser = await fetchCurrentUser();
      if (user === null) {
        setUser(currentUser);
        setFormDetails({ ...formDetails, user_id: currentUser.id });
      }
      return currentUser;
    }
    const getSubmissions = async (user) => {
      try {
        const response = await fetch(`${apiLinks.main}/api/recycle/` + user.id);
        const submissions = await response.json();
        setSubmissions(submissions.data);
        const groupedDays = groupSubmissionsByDay(submissions.data);
        setGroupedDays(groupedDays);

        // const redemptionResponse = await fetch(
        //   `${apiLinks.main}/api/redemption/` + user.id
        // );
        // const redemption = await redemptionResponse.json();
        // setRedemption(redemption.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    withUser().then(getSubmissions);
  }, []); //Add in userid later

  return (
    <>
      <main>
        <div className="relative isolate overflow-hidden pt-16">
          <header className="pb-4 pt-6 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Points
              </h1>
              <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                <a key="Overview" href="#" className={"text-indigo-600"}>
                  Overview
                </a>
              </div>
              <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7 lg:hidden">
                <a
                  key="Redeem Rewards"
                  href="/redemption"
                  className="text-indigo-600"
                >
                  Redeem Rewards
                </a>
              </div>
              <button
                onClick={toggleModal}
                className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                New submission
              </button>
              {/* Modal */}

              {showModal && (
                <SubmissionModal
                  handleSubmit={handleSubmit}
                  toggleModal={toggleModal}
                  open={showModal}
                  formDetails={formDetails}
                  setFormDetails={setFormDetails}
                />
              )}
            </div>
          </header>

          {/* Stats */}
          <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
              {stats.map((stat, statIdx) => (
                <div
                  key={stat.name}
                  className={classNames(
                    statIdx % 2 === 1
                      ? "sm:border-l"
                      : statIdx === 2
                      ? "lg:border-l"
                      : "",
                    "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                  )}
                >
                  <dt className="text-sm font-medium leading-6 text-gray-500">
                    {stat.name}
                  </dt>
                  <dd
                    className={classNames(
                      stat.changeType === "negative"
                        ? "text-rose-600"
                        : "text-gray-700",
                      "text-xs font-medium"
                    )}
                  >
                    {stat.change}
                  </dd>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
            aria-hidden="true"
          >
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
            />
          </div>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          {/* Recent activity table */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Recent activity
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedDays.map((day) => (
                        <Fragment key={day.dateTime}>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th
                              scope="colgroup"
                              colSpan={3}
                              className="relative isolate py-2 font-semibold"
                            >
                              <time dateTime={day.dateTime}>{day.date}</time>
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          {day.transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                  <transaction.icon
                                    className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                    aria-hidden="true"
                                  />
                                  <div className="flex-auto">
                                    <div className="flex items-start gap-x-3">
                                      <div className="text-sm font-medium leading-6 text-gray-900">
                                        {transaction.amount + " points"}
                                      </div>
                                      <div
                                        className={classNames(
                                          statuses[transaction.status],
                                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        {transaction.status}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden py-5 pr-6 sm:table-cell">
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {transaction.description}
                                </div>
                              </td>
                              <td className="py-5 text-right">
                                <div className="flex justify-end">
                                  <a
                                    href={transaction.href}
                                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    View
                                    <span className="hidden sm:inline">
                                      {" "}
                                      transaction
                                    </span>
                                    <span className="sr-only">
                                      , invoice #{transaction.invoiceNumber},{" "}
                                    </span>
                                  </a>
                                </div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  Invoice{" "}
                                  <span className="text-gray-900">
                                    #{transaction.invoiceNumber}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Recent redemption list*/}
          {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Recent Redemption
                </h2>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  View all<span className="sr-only">, redemption</span>
                </a>
              </div>
              <ul
                role="list"
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
              >
                {redemption.map((redemption) => (
                  <li
                    key={redemption.redemption_id}
                    className="overflow-hidden rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                      <img
                        src={redemption.reward_id}
                        alt="Image not found"
                        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                      />
                      <div className="text-sm font-medium leading-6 text-gray-900">
                        Recycling Submission
                      </div>
                      <Menu as="div" className="relative ml-auto">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Open options</span>
                          <EllipsisHorizontalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </MenuButton>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <MenuItems>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  View
                                  <span className="sr-only">
                                    , {redemption.description}
                                  </span>
                                </a>
                              )}
                            </MenuItems>
                            <MenuItems>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {redemption.description}
                                  </span>
                                </a>
                              )}
                            </MenuItems>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Description</dt>
                        <dd className="text-gray-700">{client.description}</dd>
                      </div>
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Date</dt>
                        <dd className="text-gray-700">{client.created_at}</dd>
                      </div>
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Points Awarded</dt>
                        <dd className="flex items-start gap-x-2">
                          <div className="font-medium text-gray-900">
                            {redemption.points_awarded}
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
