import React, { useRef, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmationModalBody = ({ confirmFn,cancelFn,isLoading }) => {
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

  return (
    <div className="space-y-6">
      <div style={{ display: "flex", marginTop: "10px" }} className="justify-center">
        <div className="mt-5 flex justify-center w-3/5"> 
          <Button
            text="Cancel"
            className="bg-brand-deny-red m-6"
            onClick={() => cancelFn()}
          />
          <Button
            text="Confirm"
            className=" bg-brand-brown m-6"
            isLoading={isLoading}
            onClick={() => confirmFn()}
          />

        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ hidden, onClickClose, title,confirmFn,cancelFn,isLoading }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      title={title}
      contentClass='mx-5'
      body={<ConfirmationModalBody confirmFn={confirmFn} cancelFn={cancelFn} isLoading={isLoading} />}
      closeModal={onClickClose}
      className={"bg-[#fafaf7] shadow-2xl"}
      handleModalClose={onClickClose}
    />
  );
};

export { ConfirmationModal };
