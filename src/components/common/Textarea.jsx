import React from "react";

const Textarea = ({
  id,
  placeholder,
  value,
  onChange,
  name,
  className,
  error,
}) => {
  return (
    <div>
      <div>
      <textarea
        id={id}
        name={name}
        className={`w-full min-h-[132px] px-4 py-[10px] text-brand-dark-gray text-[14px] outline-none rounded-[5px] ${
          error && "border-red-600"
        } ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      </div>
      {error && (
        <p className="text-[12px] ml-5 font-inter text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
