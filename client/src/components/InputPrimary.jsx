import React from "react";

const InputPrimary = ({ type, name, placeholder, textarea, value, onChange }) => {
  return (
    <div className="w-full mt-3 text-gray-600">
      <label htmlFor={name} className="capitalize text-lg block font-medium">
        {name.split("_").join(" ")}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="rounded-xl w-full bg-[#D1D1D147] focus:outline-none h-[5rem] px-4 py-2 mt-1 focus:bg-white focus:border-[#D1D1D147] border border-transparent"
        ></textarea>
      ) : (
        <input
          type={type ? type : "text"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-[#D1D1D147] rounded-full px-4 py-2 mt-1 focus:outline-none focus:bg-white focus:border-[#D1D1D147] border border-transparent"
        />
      )}
    </div>
  );
};


export default InputPrimary;
