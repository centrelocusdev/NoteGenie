import React, { useEffect } from "react";
import TemplateCard from "../../components/TemplateCard";
import Popup from "../../components/Popup";
import SettingsPopup from "../../components/SettingsPopup";
import CancelSubsPopup from "../../components/CancelSubsPopup";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FiPlus, FiSettings, FiX } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import { predefinedTemplates } from "../../data.js";
import {
  getPredefinedTemplates,
  getAllTemplates,
  getUserByToken,
  logout,
} from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showSubsPopup, setShowSubsPopup] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [customTemplates, setCustomTemplates] = useState([]);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [isTemplatesLoading, setIsTemplatesLoading] = useState(true);

  useEffect(() => {
    const runIt = async () => {
      const currentUser = await getUserByToken();
      setUser(currentUser);

      const templates = await getAllTemplates(currentUser._id);
      setCustomTemplates(templates);

      const predefinedTemplates = await getPredefinedTemplates(
        currentUser.profession
      );
      setTemplates(predefinedTemplates);
    };

    runIt();

    templates?.length && setIsTemplatesLoading(false);
  }, [user, templates]);

  useEffect(() => {
    if (user && !user?.is_admin) {
      if (user?.trial) {
        const now = new Date();
        const trailStartedAt = new Date(user.trial_started_at);
        let diff = (now.getTime() - trailStartedAt.getTime()) / 1000;
        diff /= 60 * 60;

        const hourDiff = Math.floor(diff);
        if (hourDiff > 24) {
          toast.warning(
            "Your trial has been expired, please purchase a plan to continue"
          );
          navigate("/pricing?status=trial_expired");
          return;
        }
      } else if (
        !user?.trial &&
        (user?.subs_plan == "free" || user?.subs_plan == "premium")
      ) {
        const now = new Date();
        const subsStartedAt = new Date(user.subs_started_at);
        let diff = (now.getTime() - subsStartedAt.getTime()) / 1000;
        diff /= 60 * 60 * 24 * 7 * 4;

        const monthDiff = Math.floor(diff);
        if (monthDiff >= 1) {
          toast.warning(
            "Your plan has been expired, please purchase a plan to continue"
          );
          navigate("/pricing?status=plan_expired");
          return;
        }
      } else if (!user?.trial && !user?.subs_plan) {
        const fetchUpdatedUser = async () => {
          const updatedUser = await getUserByToken();

          if (updatedUser)
          if(!updatedUser?.trial && !updatedUser?.subs_plan)
          toast.warning("Please consider purchasing a plan to continue");
          navigate("/pricing");
          return;
        };

        fetchUpdatedUser
      }
    }
  }, [user]);

  const handleOpenPopupClick = () => setShowPopup(true);
  const handleClosePopupClick = () => setShowPopup(false);
  const handleOpenSettingsPopupClick = () => {
    setShowSettingsPopup(true);
    setSettingsDropdown(false);
  };
  const handleOpenSubsPopup = () => {
    setShowSubsPopup(true);
    setSettingsDropdown(false);
  };
  const handleCloseSettingsPopupClick = () => setShowSettingsPopup(false);
  const handleCloseSubsPopupClick = () => setShowSubsPopup(false);
  const handleSettingsDropdownClick = () =>
    setSettingsDropdown((prev) => !prev);
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
      {showSubsPopup && <CancelSubsPopup display={handleCloseSubsPopupClick} />}
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
          <BiUserCircle className="text-2xl" />
          <p className="text-xl font-semibold hidden sm:block capitalize">
            {user?.name}
          </p>
          <button
            onClick={handleSettingsDropdownClick}
            title="settings"
            className="text-xl ml-3 rounded-full h-fit hover:text-gray-500"
          >
            {settingsDropdown ? <FiX /> : <FiSettings />}
          </button>
          <div
            className={`${
              !settingsDropdown && "hidden"
            } flex flex-col p-5 gap-1 rounded-2xl bg-white absolute translate-y-16 -translate-x-12`}
          >
            <button
              onClick={handleOpenSettingsPopupClick}
              className="border-b pb-1 text-left hover:text-theme-primary"
            >
              Update Proifle
            </button>
            {user?.subs_status != "canceled" && (
              <button
                onClick={handleOpenSubsPopup}
                className="text-left hover:text-theme-primary"
              >
                Cancel Subscription
              </button>
            )}
          </div>
          <button
            onClick={handleLogoutClick}
            title="Logout"
            className="text-2xl rounded-full h-fit hover:text-gray-500 text-red-500"
          >
            <CgLogOff />
          </button>
        </div>
      </div>
      {isTemplatesLoading ? (
        <div className="flex items-center justify-center gap-4 text-2xl">
          Loading Templates, Please wait <FaSpinner className="animate-spin" />
        </div>
      ) : (
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
                className={`flex flex-wrap lg:gap-8 gap-4 md:pl-5 ${
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

          {customTemplates?.length && (
            <div className="p-4 md:w-4/5 mx-auto">
              <h4 className="text-2xl font-medium text-primary-dark capitalize mb-2">
                custom templates
              </h4>
              <div
                className={`flex flex-wrap gap-8 md:pl-5 mt-5 ${
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
      )}
    </>
  );
};

export default Dashboard;
