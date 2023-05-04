import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { updateUser } from "../../services";

const AddWeb = ({ onClickClose, web, setWeb }) => {
  const dispatch = useDispatch();

  const handleUpdateWeb = useCallback(async () => {
    try {
      onClickClose();
      await updateUser({
        website: web,
      });
      dispatch(getUser());
    } catch (error) {
      onClickClose();
    }
  }, [web]);
  return (
    <div class="space-y-6 w-80">
      <div>
        <label
          for="value"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Website
        </label>
        <input
          type="text"
          name="value"
          id="value"
          placeholder="Link/URL"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          value={web}
          onChange={(event) => setWeb(event.target.value)}
        />
      </div>
      <div>
        <div className="flex flex-row gap-5">
          <Button
            text="Save"
            className="w-full bg-brand-dark-brown"
            onClick={handleUpdateWeb}
          />
        </div>
      </div>
    </div>
  );
};

const AddWebCard = ({ hidden, onClickClose, web, setWeb }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      title={"Add Website"}
      body={<AddWeb onClickClose={onClickClose} web={web} setWeb={setWeb} />}
      closeModal={onClickClose}
      className={"bg-[#fafaf7] shadow-2xl"}
      handleModalClose={onClickClose}
    />
  );
};

export default AddWebCard;
