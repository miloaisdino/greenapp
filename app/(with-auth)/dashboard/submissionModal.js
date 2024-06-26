import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { CldUploadWidget } from "next-cloudinary";

export default function SubmissionModal({
  handleSubmit,
  toggleModal,
  open,
  formDetails,
  setFormDetails,
}) {
  const cancelButtonRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageTags, setImageTags] = useState([]);

  const handleUpload = (result, options) => {
    const imageUrl = result.info.secure_url;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      image_url: imageUrl,
    }));
    setUploadedImageUrl(imageUrl);
    setUploadStatus(true);
    const imageTags = result.info.tags;
    setImageTags(imageTags);

    // Calculate points awarded
    const points = imageTags.length * 50;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      points_awarded: points,
    }));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {uploadStatus
                        ? "Image Uploaded Successfully"
                        : "Please take a picture of your recycling item for verification"}
                    </Dialog.Title>

                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      {" "}
                      {uploadStatus ? (
                        <div>
                          <img
                            src={uploadedImageUrl}
                            alt="Uploaded"
                            className=""
                          />
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Your image has been uploaded successfully.
                          </p>
                          {imageTags.length > 0 && (
                            <div className="mt-2 text-sm leading-6 text-gray-600">
                              <strong>Tags:</strong> {imageTags.join(", ")}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <CldUploadWidget
                                uploadPreset="SubmissionsUploadPreset"
                                onSuccess={handleUpload}
                                options={{
                                  acceptedFormats: [
                                    "jpg",
                                    "jpeg",
                                    "png",
                                    "gif",
                                  ],
                                }}
                              >
                                {({ open }) => {
                                  return (
                                    <button onClick={() => open()}>
                                      Upload an Image (.jpg, .jpeg, .png, .gif)
                                    </button>
                                  );
                                }}
                              </CldUploadWidget>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="description"
                          id="description"
                          autoComplete="description"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                          defaultValue={formDetails.description}
                          onChange={(e) =>
                            setFormDetails({
                              ...formDetails,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <label
                      htmlFor="points_awarded"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Points Awarded
                    </label>
                    <div className="mt-2">
                      <p className="text-lg font-semibold leading-6 text-indigo-600 bg-indigo-100 rounded-md p-2">
                        {formDetails.points_awarded || 0} points
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={toggleModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
