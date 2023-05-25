import React, { useState } from "react";
import { BsThreeDots, BsStar, BsClipboard, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TemplateCard = ({template, key}) => {
  const navigate = useNavigate()
  const [displayMenu, setDisplayMenu] = useState(false)

  const handleClick = () => {
    setDisplayMenu(displayMenu => !displayMenu)
  }

  const hanldeCardClick = () => {
    navigate(`/dashboard/editor/${template.id}`)
  }

  return (
    <div onClick={hanldeCardClick} className="bg-theme-primary p-5 my-1 rounded-2xl md:w-[48%] w-full lg:w-[30%] flex flex-col justify-between gap-2 border border-transparent hover:bg-dark cursor-pointer">
      <div className="flex justify-between gap-2">
        <h4 className="text-lg text-primary-dark font-semibold">{template.title}</h4>
        <button onClick={handleClick} className="border  p-1 text-sm rounded-full h-fit hover:bg-[rgba(0,0,0,0.1)]">
          { displayMenu ? <BsX /> : <BsThreeDots />}
        </button>
        <ul className={`${displayMenu ? 'block' : 'hidden'} bg-white rounded-lg p-5 text-primary-dark text-sm absolute translate-x-52 -translate-y-24`}>
          <li className="my-1">
              <button  className="flex gap-2 ">
                <BsStar /> <span>Add to Favorites</span>
              </button>
          </li> 
          <li className="my-1">
              <button  className="flex gap-2">
                <BsClipboard /> <span>Copy Prompt</span>
              </button>
          </li> 
        </ul>
      </div>

      <div className="flex justify-between ">
        <h6 className="w-fit">Tags</h6>
        <div className="flex flex-wrap gap-1">
          {
            template.tags.map((tag) => (
              <span className="text-[0.8rem] capitalize px-3 py-1 bg-[rgba(0,0,0,0.1)] rounded-full font-semibold">{tag}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TemplateCard
