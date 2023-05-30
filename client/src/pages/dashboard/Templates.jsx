import React, { useEffect } from "react";
import TemplateCard from "../../components/TemplateCard";
import Popup from "../../components/Popup";
import SettingsPopup from "../../components/SettingsPopup";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FiPlus, FiSettings } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BiUserCircle, BiChevronLeftCircle } from "react-icons/bi";
import { useState } from "react";
import { predefinedTemplates } from "../../data.js";
import { getAllTemplates, getUserByToken, logout } from "../../api";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [customTemplates, setCustomTemplates] = useState([]);

  useEffect(() => {
    const runIt = async () => {
      const currentUser = await getUserByToken();
      setUser(currentUser);

      const templates = await getAllTemplates(currentUser._id);
      setCustomTemplates(templates);
    };

    runIt();
    setTemplates(() => {
      return predefinedTemplates(user?.profession);
    });
  }, []);

  const handleOpenPopupClick = () => setShowPopup(true);
  const handleClosePopupClick = () => setShowPopup(false);
  const handleOpenSettingsPopupClick = () => setShowSettingsPopup(true);
  const handleCloseSettingsPopupClick = () => setShowSettingsPopup(false);
  const handleLogoutClick = async () => {
    const res = await logout();
    res && navigate("/");
  };

  return (
    <>
      {showPopup && <Popup display={handleClosePopupClick} />}
      {showSettingsPopup && (
        <SettingsPopup display={handleCloseSettingsPopupClick} />
      )}
      <div className="flex justify-between md:px-12 p-4 py-6">
        <div className="flex gap-2">
          <button
            onClick={(e) => navigate("/")}
            title="Back"
            className="text-2xl hover:text-gray-600"
          >
            <BsArrowLeftCircle />
          </button>
          <h2 className="text-primary-dark text-2xl font-medium uppercase">
            Dashboard
          </h2>
        </div>

        <div className="flex gap-2 items-center">
          {/* <img src={user} alt="avatar" className="w-12 rounded-full" /> */}
          <BiUserCircle className="text-2xl" />
          <p className="text-xl font-semibold hidden sm:block">{user?.name}</p>
          <button
            onClick={handleOpenSettingsPopupClick}
            title="settings"
            className="text-2xl ml-3 rounded-full h-fit hover:text-gray-500"
          >
            <FiSettings />
          </button>
          <button
            onClick={handleLogoutClick}
            title="Logout"
            className="text-2xl rounded-full h-fit hover:text-gray-500 text-red-500"
          >
            <CgLogOff />
          </button>
        </div>
      </div>
      <div>
        <div className="p-4 md:w-4/5 mx-auto">
          <div className="md:flex justify-between items-center w-full md:w-[95%] mx-auto">
            <h4 className="text-2xl font-medium text-primary-dark capitalize mb-2">
              select new template
            </h4>
            <ButtonPrimary
              text={"add note magic"}
              icon={<FiPlus />}
              handleClick={(e) => navigate("/dashboard/editor/template/new")}
            />
          </div>
          <div className="flex flex-wrap gap-4 justify-evenly">
            <div
              className={`flex flex-wrap gap-8 md:pl-5 ${
                (templates.length + 1) % 3 == 0
                  ? "justify-evenly"
                  : "justify-start"
              }`}
            >
              <div
              onClick={handleOpenPopupClick}
              className="bg-theme-primary p-5 my-1 rounded-2xl md:w-[48%] w-full h-[8rem] lg:w-[30%] flex flex-col justify-center items-center gap-2 border border-transparent hover:bg-[#ffebb3] cursor-pointer"
            >
              <FiPlus className="text-[2rem]" />
              <h4 className="font-semibold capitalize ">
                create custom templates
              </h4>
            </div>
              {templates.map((t, key) => (
                <TemplateCard template={t} key={key} />
              ))}
            </div>
          </div>
        </div>

        {customTemplates.length && (
          <div className="p-4 md:w-4/5 mx-auto">
            <h4 className="text-2xl font-medium text-primary-dark capitalize mb-2">
              custom templates
            </h4>
            <div
              className={`flex flex-wrap gap-8 pl-5 mt-5 ${
                customTemplates.length % 3 == 0
                  ? "justify-evenly"
                  : "justify-start"
              }`}
            >
              {customTemplates.map((t, key) => (
                <TemplateCard template={t} key={key} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Templates;
