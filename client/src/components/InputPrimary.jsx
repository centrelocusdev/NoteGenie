import React from "react";

const InputPrimary = ({ type, name, placeholer, textarea }) => {
  return (
    <div className={`w-full mt-3`}>
      <label htmlFor={name} className="capitalize text-lg block">
        {name.split('_').join(' ')}
      </label>
      {
        textarea ? <textarea name={name} className="rounded-xl w-full bg-[#D1D1D147] focus:outline-none"></textarea> : <input
        type={type ? type : 'text'}
        name={name}
        placeholder={placeholer}
        className="w-full bg-[#D1D1D147] rounded-full px-4 py-2 mt-1 focus:outline-none focus:bg-primary-light"
      />
      }
    </div>
  );
};

export default InputPrimary;
