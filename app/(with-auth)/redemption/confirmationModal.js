import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function ConfirmationModal({
  open,
  handleConfirmSubmit,
  handleCancelSubmit,
  toggleModal,
  content,
  data,
  user,
}) {
  const cancelButtonRef = useRef(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleConfirm = () => {
    // Call the confirm submit function
    handleConfirmSubmit();

    // Set the purchase success status to true
    setPurchaseSuccess(true);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={toggleModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-4/12 sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-0.5 mb-3 flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                      />
                    </div>
                    <div className="flex h-12 w-auto ml-2.5 items-center justify-center">
                      <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Order Confirmation
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Description className="mt-3 text-sm text-gray-500">
                    {content}
                    <div
                        className="mt-3.5 space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base text-gray-500 dark:text-white">Current Points</dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">{user.balances.current_points}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base text-gray-500 dark:text-white">1 × {data.name}</dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">- {data.price}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-1 dark:border-gray-700">
                          <dt className="text-base text-gray-500 dark:text-white">Remaining Points</dt>
                          <dd className="text-base font-medium text-green-500">{user.balances.current_points - data.price}</dd>
                        </dl>
                      </div>
                    </div>
                  </Dialog.Description>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {purchaseSuccess ? (
                      <>
                        <button
                            disabled
                            type="button"
                            className="disabled inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        >
                          Processing...
                        </button>
                        <button
                            disabled
                            type="button"
                            className="disabled mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0"
                        >
                          Cancel
                        </button>
                      </>
                  ) : (
                      <>
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            onClick={handleConfirm}
                        >
                          Confirm
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={handleCancelSubmit}
                            ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
