import React, { useState } from "react";
import { BsThreeDots, BsStar, BsClipboard, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();

  const hanldeCardClick = () => {
    navigate(`/dashboard/editor/template?id=${template._id}&type=${template.type ? template.type : 'predefined'}`);
  };

  return (
    <div
      onClick={hanldeCardClick}
      className="bg-theme-primary p-5 my-1 rounded-2xl md:w-[48%] w-full lg:w-[30%] h-[8rem] flex flex-col justify-center items-center gap-2 border border-transparent hover:bg-[#ffebb3] cursor-pointer"
    >
      <h4 className="text-xl text-primary-dark font-semibold text-center capitalize">
        {template.name}
      </h4>
    </div>
  );
};

export default TemplateCard;
