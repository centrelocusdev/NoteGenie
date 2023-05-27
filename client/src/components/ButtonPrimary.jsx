import React from "react";

const ButtonPrimary = ({ text, icon, isDark, handleClick, width }) => {
  return (
    <button onClick={handleClick} className={`${isDark ? 'bg-primary-dark text-white hover:bg-transparent hover:text-secondary-dark border border-primary-dark' : 'bg-theme-primary text-dark hover:bg-[#ffebb3] font-semibold'} w-${width ? width : 'fit'}  capitalize rounded-full px-6 py-2 flex justify-center items-center gap-2  my-2`}>
     {icon} {text} 
    </button>
  );
};

export default ButtonPrimary;
