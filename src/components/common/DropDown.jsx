import React, { useRef, useEffect, useState } from 'react';

const DropDown = ({ title, items, onSelect }) => {
  const [hidden, setHidden] = useState(true);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setHidden(true);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <div ref={wrapperRef}>
      <button
        id='dropdownUsersButton'
        data-dropdown-toggle='dropdownUsers'
        data-dropdown-placement='bottom'
        className='text-white bg-brand-dark-gray rounded-md text-md px-4 py-2.5 text-left inline-flex items-center'
        type='button'
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        <div className='w-full'>{title}</div>
        <svg
          className='ml-2 w-4 h-4'
          aria-hidden='true'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>
      <div
        id='dropdownUsers'
        className={`${
          hidden && 'hidden'
        } z-10 w-60 bg-white rounded shadow dark:bg-gray-700`}
      >
        <ul
          className='overflow-y-auto py-1 h-48 text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownUsersButton'
        >
          {items.map((item,index) => {
            return (
              <li key={index}>
                <a
                  href='#'
                  className='flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => {
                    onSelect(item.title);
                    setHidden(true);
                  }}
                >
                  {item.image && (
                    <img
                      className='mr-2 w-6 h-6 rounded-full'
                      src={item.image}
                      alt={item.title}
                    />
                  )}

                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
