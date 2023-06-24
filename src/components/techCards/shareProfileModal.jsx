import React, { useRef, useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { shareProfile } from "../../services";
import Button from "../../components/common/Button";
import Send from "../../assets/icons/common/mingcute_send-plane-line.svg";
import Tick from "../../assets/icons/common/tick.svg";
import { Tooltip } from "flowbite-react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './shareProfile.css'

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper";

const ShareProfileBody = ({ link, isPublic }) => {
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setHidden(true);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const sendEmail = async () => {
    try {
      setError(null);
      if (email) {
        setIsLoading(true);
        await shareProfile({
          link: link,
          email: email,
        });
        setIsLoading(false);
        setIsComplete(true);
      } else {
        setError("Email field cannot be empty");
      }
    } catch (error) {
      setError("Something went wrong");
      setIsComplete(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!isPublic && (
        <>
         

          <Swiper
            effect={"flip"}
            grabCursor={true}
            navigation={true}
            modules={[EffectFlip, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <>
              <label
            htmlFor="value"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email to share
          </label>
          {error && (
            <p className="text-[12px] font-inter text-red-600">{error}</p>
          )}
          <div style={{ display: "flex", marginTop: "10px" }}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email to share"
              className={`bg-gray-50 border ${
                error ? "border-red-600" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Button
              text={
                !isLoading &&
                (isComplete ? <img src={Tick} /> : <img src={Send} />)
              }
              isLoading={isLoading}
              className="w-35%  ml-4 bg-brand-dark-brown"
              onClick={() => {
                !isComplete && sendEmail();
              }}
            />
          </div>
              </>
            </SwiperSlide>
            <SwiperSlide>
              <p>QR code goes here</p>
            </SwiperSlide>
          </Swiper>
        </>

        
      )}

      <div className="mt-5 flex justify-center">
        <Tooltip
          placement="top"
          content={"Profile link copied"}
          trigger="click"
        >
          <Button
            text="Copy profile link"
            className="bg-brand-dark-brown w-full text-[13px] font-semibold"
            onClick={() => navigator.clipboard.writeText(link)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

const ShareProfileModal = ({ hidden, isPublic, onClickClose, link }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      title={`Share ${isPublic ? "this" : "my"} profile`}
      contentClass='mx-10'
      body={<ShareProfileBody link={link} isPublic={isPublic} />}
      closeModal={onClickClose}
      className={"bg-[#fafaf7] sm:min-h-0 max-h-[calc(100vh-80px)] shadow-2xl"}
      handleModalClose={onClickClose}
    />
  );
};

export { ShareProfileModal };
