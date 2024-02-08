import React from "react";

const ButtonPrimary = ({ text, icon, isDark, handleClick, width , isDisabled }) => {
  return (
    <button disabled={isDisabled} onClick={handleClick} className={`${isDisabled ? "cursor-not-allowed focus:outline-none disabled:opacity-75": ""} ${isDark ? 'bg-primary-dark text-white hover:bg-transparent hover:text-secondary-dark border border-primary-dark' : 'bg-theme-primary text-dark hover:bg-[#ffebb3] font-semibold'} w-${width ? width : 'fit'}  capitalize rounded-full px-6 py-2 flex justify-center items-center gap-2  mt-5 mb-3`}>
     {icon} {text} 
    </button>
  );
};

export default ButtonPrimary;
