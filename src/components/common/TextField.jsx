import React from "react";
import styles from './styles.css'

const TextField = ({
  icon,
  type,
  id,
  placeholder,
  label,
  value,
  onChange,
  name,
  error,
}) => {
  return (
    <div className="relative">
      <div
        className={`relative text-[14px] font-inter border border-gray-300 rounded-[15px] flex items-center p-4 gap-[10px]  ${
          error && "border-red-600"
        }`}
      >
        <img src={icon} alt="" className="h-4" />
        <input
          type={type}
          id={id}
          name={name}
          className={`w-full h-8 font-semibold text-brand-dark-gray outline-none border-0 focus-none`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className={`absolute -top-3 left-8 bg-white px-1 text-brand-mid-gray ${
            error && "text-red-600"
          }`}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-[12px] ml-5 font-inter text-red-600">{error}</p>}
    </div>
  );
};

export default TextField;
