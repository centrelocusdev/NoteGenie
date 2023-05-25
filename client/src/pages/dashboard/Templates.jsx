import React, { useEffect } from "react";
import TemplateCard from "../../components/TemplateCard";
import Popup from "../../components/Popup";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import { templates } from "../../data";
import { getUserByToken } from "../../api";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
     const runIt = async () => {
      const currentUser = await getUserByToken()
      setUser(currentUser)
     }

     runIt()
  }, [])

  const handleOpenPopupClick = () => setShowPopup(true)
  const handleClosePopupClick = () => setShowPopup(false)

  const predefined = templates.filter((template => template.type == 'predefined'))
  const custom = templates.filter((template => template.type == 'custom'))

  return (
    <>
      {
        showPopup && <Popup display={handleClosePopupClick} />
      }
      <div className="flex justify-between px-12 py-6">
        <h5 className="font-bold text-2xl">Dashboard</h5>

        <div className="flex gap-2 items-center">
          {/* <img src={user} alt="avatar" className="w-12 rounded-full" /> */}
          <BiUserCircle className="text-2xl" />
          <p className="text-lg font-semibold hidden sm:block">{user?.name}</p>

          <button
            className="border p-1 text-sm rounded-full h-fit hover:bg-[rgba(0,0,0,0.1)]"
          >
            <BsThreeDots />
          </button>
        </div>
      </div>
      <div>
        <div className="p-4 md:w-4/5 mx-auto">
          <div className="flex justify-between items-center w-full">
            <h4 className="text-2xl font-bold text-primary-dark capitalize mb-2">
              select new template
            </h4>
            <ButtonPrimary text={"add sample note"} icon={<FiPlus />} handleClick={(e) => navigate('/dashboard/editor/0')} />
          </div>
          <div className="flex flex-wrap gap-4 justify-evenly">
            {predefined.map((t, key) => (
              <TemplateCard template={t} key={key} />
            ))}
             <button onClick={handleOpenPopupClick} className="md:w-[20rem] w-full rounded-2xl bg-theme-primary h-[8.5rem] py-4 flex justify-center flex-col items-center text-primary-dark hover:bg-white">
             <FiPlus className="text-[2rem]" />
             <h4 className="font-semibold capitalize ">create custom templates</h4>
             </button>
          </div>
        </div>

        <div className="p-4 md:w-4/5 mx-auto">
          <h4 className="text-2xl font-bold text-primary-dark capitalize mb-2">
            custom templates
          </h4>
          <div className="flex flex-wrap gap-4 justify-evenly">
            {custom.map((t, key) => (
              <TemplateCard template={t} key={key} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};



export default Templates;
