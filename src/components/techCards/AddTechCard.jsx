import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Modal from "../../components/common/Modal";
import TabViewHeader from "../../components/common/TabViewHeader";
import AddAdminContact from "./AddAdminContact";
import AddCustomContact from "./AddCustomContact";

import {
  upsertUserService,
  getAllAdminServices,
  getIconUploadSingedUrl,
  uploadAttachment,
  addCustomService,
} from "../../services/";
import { getUser } from "../../store/actions";

const HeaderTab = ({ activeTab, setActiveTab,category }) => {
 
  return (
    <TabViewHeader
      activeTab={activeTab}
      tabs={[
        { title: `Add link`, key: "add_contact" },
        { title: `Add custom link`, key: "add_custom_contact" },
      ]}
      onChange={(tab) => setActiveTab(tab)}
    />
  );
};

const AddService = ({ category, onClickClose }) => {
  const [selectedService, setSelectedService] = useState([]);
  const [adminServices, setAdminServices] = useState([]);
  const [activeTab, setActiveTab] = useState(undefined);
  const [selectedIcon, setSelectedIcon] = useState(undefined);
  const [serviceValue, setServiceValue] = useState(undefined);
  const [serviceName, setServiceName] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [overallError, setOverallError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getAllAdminServices().then((data) => {
      setAdminServices(data);
    });
  }, []);

  const onSelect = (key) => {
    const item = adminServices.find((service) => service.name == key);
    if (item) {
      setSelectedService(item);
    }
  };

  const addService = async (type) => {
    setIsLoading(true);
    try {
      if (!serviceValue) {
        setOverallError("Please enter contact link/number/mail");
        setIsLoading(false);
        return;
      }
      if (type === "custom") {
        if (!serviceName) {
          setOverallError("Please enter contact name");
          setIsLoading(false);
          return;
        }
        let iconPath=''
        if(selectedIcon){
          const { singedUrl, iconUrl } = await getIconUploadSingedUrl(
            selectedIcon.name,
            selectedIcon.type
          );
          iconPath=iconUrl
          await uploadAttachment(selectedIcon.file, singedUrl);
        }
        const { serviceId } = await addCustomService({
          category: category,
          name: serviceName,
          icon: iconPath,
        });
        await upsertUserService({
          serviceId,
          isCustomService: true,
          value: serviceValue,
        });
      }
      if (type === "admin") {
        await upsertUserService({
          serviceId: selectedService.serviceId,
          isCustomService: false,
          value: serviceValue,
        });
      }
      dispatch(getUser());
      onClickClose();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div class="space-y-6">
      <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} category={category} />
      <div>
        {overallError && (
          <p className="text-[12px] ml-5 font-inter text-red-600">
            {overallError}
          </p>
        )}
        {activeTab && activeTab.key === "add_custom_contact" ? (
          <AddCustomContact
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            serviceValue={serviceValue}
            setServiceValue={setServiceValue}
            serviceName={serviceName}
            setServiceName={setServiceName}
            addService={addService}
            isLoading={isLoading}
          />
        ) : (
          <AddAdminContact
            adminServices={adminServices}
            selectedService={selectedService}
            onSelect={onSelect}
            category={category}
            serviceValue={serviceValue}
            setServiceValue={setServiceValue}
            addService={addService}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

const AddTechCard = ({ category, hidden, onClickClose }) => {

  let title;
  switch (category) {
    case 'GET_IN_TOUCH':
      title='Add Contact Info'
      break;

    case 'PAYMENT_LINKS':
      title='Add Payment Links'
      break;
    case 'SOCIAL_LINKS':
      title='Add Social Links'
      break;
    default:
      break;
  }
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      title={title}
      body={<AddService category={category} onClickClose={onClickClose} />}
      closeModal={onClickClose}
      className={"bg-[#fafaf7] shadow-2xl"}
      handleModalClose={onClickClose}
    />
  );
};

export default AddTechCard;
