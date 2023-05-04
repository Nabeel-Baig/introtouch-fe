import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserService, upsertUserService } from "../../services/";
import { getUser } from "../../store/actions";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";

const EditService = ({ service, onClickClose }) => {
  const [value, setValue] = useState(service.value);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [overallError, setOverallError] = useState();

  const dispatch = useDispatch();
  const updateService = async () => {
    try {
      setIsEditLoading(true);
      if (!value) {
        setIsEditLoading(false);
        setOverallError("Please enter service link/number/mail");
        return;
      }
      await upsertUserService({
        serviceId: service.serviceId,
        isCustomService: service.type === "CUSTOM" ? true : false,
        value: value,
      });
      dispatch(getUser());
      onClickClose();
      setIsEditLoading(false);
    } catch (error) {
      setOverallError(error?.message || "Something went wrong");
      setIsEditLoading(false);
    }
  };

  const deleteService = async () => {
    try {
      setIsDeleteLoading(true);
      await deleteUserService(service.serviceId);
      dispatch(getUser());
      onClickClose();
      setIsDeleteLoading(false);
    } catch (error) {
      setIsDeleteLoading(false);
    }
  };
  return (
    <div class="space-y-6 w-80">
      <div className="flex flex-row content-center items-center gap-5 bg-gray-100 p-2 drop-shadow-sm rounded-md ">
        {overallError && (
          <p className="text-[12px] ml-5 font-inter text-red-600">
            {overallError}
          </p>
        )}
        <div className="flex h-12 w-12 items-center content-center justify-center drop-shadow-lg">
          <img src={service.icon} className="h-[44px] object-cover" />
        </div>
        <div>{service.name}</div>
      </div>
      <div>
        <label
          for="value"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Link/URL
        </label>
        <input
          type="text"
          name="value"
          id="value"
          placeholder="Link/URL"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div>
        <div className="flex flex-row gap-5">
          <Button
            text="Remove"
            isLoading={isDeleteLoading}
            className="w-full font-medium text-gray-800 bg-brand-light-gray border-2 border-rose-600"
            onClick={deleteService}
          />
          <Button
            isLoading={isEditLoading}
            text="Update"
            className="w-full bg-brand-dark-brown"
            onClick={updateService}
          />
        </div>
      </div>
    </div>
  );
};

const EditTechCard = ({ service, hidden, onClickClose }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      title={"Edit Service"}
      body={<EditService service={service} onClickClose={onClickClose} />}
      closeModal={onClickClose}
      className={"bg-[#fafaf7] shadow-2xl"}
      handleModalClose={onClickClose}
    />
  );
};

export default EditTechCard;
