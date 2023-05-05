import placeholder from "../../assets/icons/common/introtouch-Icon.svg";

const ServiceList = ({ services = [] }) => {
  return (
    <div className="w-full max-w-md p-4 mb-16 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Contact Engagements
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {services.map((item) => (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {item.icon ? (
                    <img className="w-8 h-8" src={item.icon} alt="Neil image" />
                  ) : (
                    <img className="w-8 h-8" src={placeholder} alt="Neil image" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    No of Engagements
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {item.count}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceList;
