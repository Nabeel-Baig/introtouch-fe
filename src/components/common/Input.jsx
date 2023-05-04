import React from 'react';

const Input = ({ type, id, placeholder, value, onChange, name, className, error }) => {
  return (
    <>
    <input
      type={type}
      id={id}
      name={name}
      className={`w-full px-4 py-3 text-brand-dark-gray text-[14px] outline-none rounded-[5px] ${error && "border-red-600"} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
          {error && <p className="text-[12px] ml-5 font-inter text-red-600">{error}</p>}

    </>
  );
};

export default Input;
