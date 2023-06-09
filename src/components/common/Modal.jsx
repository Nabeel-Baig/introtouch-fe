import React, {useEffect, useRef} from "react";
import {Tooltip} from "flowbite-react";
// import { Info } from "../../assets/icons/info/Info.svg"

const Modal = ({
                   title,
                   body,
                   closeModal,
                   className,
                   contentClass,
                   handleModalClose = () => {
                   },
                   closeBtnColorWhite,
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
                                fill={closeBtnColorWhite ? 'white' : 'black'}
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
                            {(title === 'Add Bio') && (
                                <Tooltip
                                    content="It must provide a concise overview of your professional background, expertise, and key achievements, enabling visitors to quickly understand your qualifications and value proposition.">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
                                    </svg>
                                </Tooltip>
                            )}

                            <div>{body}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
