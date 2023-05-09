import React, { useEffect, useRef } from "react";

const Modal = ({
  title,
  body,
  closeModal,
  className,
  contentClass,
  handleModalClose = () => {},
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleModalClose();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <div>
      <div
        id="overlay"
        className="fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"
      ></div>
      <div
        ref={wrapperRef}
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="false"
        className={`overflow-y-auto overflow-x-hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max p-0 rounded-lg ${className}`}
      >
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="relative rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className={`mb-4 text-xl font-medium text-gray-900 dark:text-white ${contentClass}`}>
                {title}
              </h3>
              <div>{body}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
