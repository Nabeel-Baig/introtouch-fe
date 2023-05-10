import DropZone from '../../components/common/DropZone';
import Button from '../../components/common/Button';

const AddCustomContact = ({
  selectedIcon,
  setSelectedIcon,
  serviceValue,
  setServiceValue,
  serviceName,
  setServiceName,
  addService,
  isLoading
}) => {
  return (
    <div className='space-y-6'>
      <div>
        <label
          for='email'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Select an item
        </label>
        <DropZone
          setUploadedFile={(file) => {
            const selectedFile = file?.length ? file[0] : null;
            setSelectedIcon(selectedFile);
          }}
          uploadedFile={selectedIcon}
        />
      </div>
      <div>
        <label
          for='name'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Name'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          required
          value={serviceName}
          onChange={(event) => {
            setServiceName(event.target.value);
          }}
        />
      </div>
      <div>
        <label
          for='value'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Link/URL
        </label>
        <input
          type='text'
          name='value'
          id='value'
          placeholder='Link/URL'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          required
          value={serviceValue}
          onChange={(event) => {
            setServiceValue(event.target.value);
          }}
        />
      </div>
      <Button
        text='Add Link'
        isLoading={isLoading}
        className='w-full bg-brand-dark-brown'
        onClick={() => addService('custom')}
      />
    </div>
  );
};

export default AddCustomContact;
