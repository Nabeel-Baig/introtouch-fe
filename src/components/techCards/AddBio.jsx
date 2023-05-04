import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { updateUser } from "../../services";
import Textarea from "../common/Textarea";

const AddBio = ({ onClickClose, bio, setBio }) => {
  const dispatch = useDispatch();
  const handleUpdateBio = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        onClickClose();
        await updateUser({
          bio: bio,
        });
        dispatch(getUser());
      } catch (error) {
        onClickClose();
      }
    },
    [bio]
  );
  return (
    <div class="space-y-6 w-80">
      <div>
        <label
          for="value"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Bio
        </label>
        <Textarea
          type="text"
          name="value"
          id="value"
          placeholder="Link/URL"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </div>
      <div>
        <div className="flex flex-row gap-5">
          <Button
            text="Save"
            className="w-full bg-brand-dark-brown"
            onClick={handleUpdateBio}
          />
        </div>
      </div>
    </div>
  );
};

const AddBioCard = ({ hidden, onClickClose, bio, setBio }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      title={"Add Bio"}
      body={<AddBio onClickClose={onClickClose} bio={bio} setBio={setBio} />}
      closeModal={onClickClose}
      className={"bg-[#fafaf7] shadow-2xl"}
      handleModalClose={onClickClose}
    />
  );
};

export default AddBioCard;
