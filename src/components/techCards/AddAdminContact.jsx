import DropDown from "../../components/common/DropDown";
import Button from "../../components/common/Button";

const AddAdminContact = ({
  adminServices,
  selectedService,
  onSelect,
  category,
  serviceValue,
  setServiceValue,
  addService,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an item
        </label>
        <DropDown
          title={selectedService?.name || "Select an item"}
          onSelect={onSelect}
          items={adminServices
            .filter((item) => item.category === category)
            .map((item) => ({ title: item.name, image: item.icon }))}
        />
      </div>
      <div>
        <label
          for="value"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {selectedService.type === "MAIL"
            ? "Enter your email"
            : selectedService.type === "CALL" || selectedService.type === "SMS"
            ? "Enter your phone number"
            : selectedService.typr === "WHATSAPP"
            ? "Enter your whatsapp number"
            : "Link/URL"}
        </label>
        <input
          type="text"
          name="value"
          id="value"
          placeholder={
            selectedService.type === "MAIL"
              ? "e.g. john@email.com"
              : selectedService.type === "CALL" ||
                selectedService.type === "SMS"
              ? "e.g. +1-416-555-1212"
              : selectedService.typr === "WHATSAPP"
              ? "e.g. +1-416-555-1212"
              : "Link/URL"
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          value={serviceValue}
          onChange={(event) => {
            setServiceValue(event.target.value);
          }}
        />
      </div>
      <Button
        text="Add Link"
        isLoading={isLoading}
        className="w-full bg-brand-dark-brown"
        onClick={() => addService("admin")}
      />
    </div>
  );
};

export default AddAdminContact;
