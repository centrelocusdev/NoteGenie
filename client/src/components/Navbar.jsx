import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";
import Scroll from "react-scroll";
import logo from "../assets/logo-yellow.png";
import { Link } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import { getUserByToken, logout } from "../api";
import { FiPlus, FiSettings, FiX } from "react-icons/fi";
import SettingsPopup from "./SettingsPopup";
import CancelSubsPopup from "./CancelSubsPopup";


const Goto = Scroll.Link;

const Navbar = () => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showSubsPopup, setShowSubsPopup] = useState(false);

const [settingsDropdown, setSettingsDropdown] = useState(false);
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState();

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
  
  useEffect(() => {
    const runIt = async () => {
      const u = await getUserByToken();
      setUser(u);
    };

    runIt();
  }, []);

  const handleClick = () => {
    setSidebar((prev) => !prev);
  };

  const handleLogoutClick = async () => {
    const res = await logout();
    window.location.reload();
  };

  const navItems = [
    "features",
    "about",
    "faq",
    "support",
    "pricing",
    "dashboard",
  ];

  return (
    <>
     {showSettingsPopup && (
        <SettingsPopup display={handleCloseSettingsPopupClick} />
      )}
      {showSubsPopup && <CancelSubsPopup display={handleCloseSubsPopupClick} />}
    <div className="w-full top-0 bg-primary-dark py-1 relative">
      <div className="flex flex-wrap flex-col md:flex-row justify-between md:items-center md:px-12">
        <div className="flex justify-between px-5 py-2 md:py-0">
          <Link
            to="/"
            className="text-primary-dark font-semibold flex items-center gap-2 text-2xl"
          >
            <img src={logo} alt="NoteGenie logo" className="w-20 md:w-32" />
          </Link>
          <button
            onClick={handleClick}
            className="cursor-pointer md:hidden float-right right-0 text-primary-light w-fit text-xl"
          >
            <FaBars />
          </button>
        </div>
        <ul
          className={`z-10 h-screenlist-none md:flex items-center text-gray-200  text-md text-left md:static fixed h-full md:w-auto md:bg-[transparent] top-0 md:space-y-0 overflow-hidden transition-all ${
            sidebar ? "w-[100%] bg-primary-dark" : "w-0"
          } md:pt-0 pt-10`}
          style={{
            backdropFilter: "blur(50px)",
          }}
        >
          <li
            onClick={handleClick}
            className="md:hidden float-right mr-3 text-gray -mt-6 text-2xl cursor-pointer"
          >
            <FiXCircle />
          </li>
          {navItems.map((item, index) => (
            <li key={index}>
              {item == navItems[3] ||
              item == navItems[4] ||
              item == navItems[5] ? (
                <Link to={item}>
                  <button
                    className={`${
                      item == navItems[5] ? (user ? "block" : "hidden") : ""
                    } text-primary-light mx-1 lg:px-5 w-full lg:w-fit hover:text-theme-primary rounded-xl md:text-left text-center capitalize font-semibold md:py-0 py-2`}
                  >
                    {item}
                  </button>
                </Link>
              ) : (
                <Goto to={item} spy={true} smooth={true} duration={250}>
                  <button className="text-primary-light text-lg mx-1 lg:px-5 w-full lg:w-fit hover:text-theme-primary rounded-xl md:text-left text-center capitalize font-semibold md:py-0 py-2">
                    {item}
                  </button>
                </Goto>
              )}
            </li>
          ))}
          <li className="md:hidden text-gray text-lg mx-auto md:px-0 px-5 w-full text-center flex flex-col w-fit">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-primary-light text-lg md:px-0 px-5 w-full lg:w-fit hover:text-primary-light py-2 md:text-left text-center capitalize font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-primary-light text-lg md:px-0 px-5 w-full lg:w-fit hover:text-primary-light py-2 md:text-left text-center capitalize font-semibold"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
              
                <Link
                  to={"/"}
                  onClick={handleLogoutClick}
                  className="text-[#D62732] text-lg md:px-0 px-5 w-full lg:w-fit hover:text-primary-light py-2 md:text-left text-center capitalize font-semibold flex items-center gap-2 justify-center"
                >
                  <CgLogOff /> Logout
                </Link>
              </>
            )}
          </li>
        </ul>
        <div className="md:flex items-center hidden">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-primary-light text-lg mx-4  font-semibold md:px-0 px-5 w-full lg:w-fit lg-transparent hover-yellow-500 hover:text-yellow-500 py-1 text-left"
              >
                Login
              </Link>
              <ButtonPrimary
                text={"sign up"}
                handleClick={(e) => navigate("/signup")}
              />
            </>
          ) : (
            <>
             <button
                  onClick={handleSettingsDropdownClick}
                  title="settings"
                  className=" mr-5 text-xl ml-3 rounded-full h-fit hover:text-gray-500"
                >
                  {settingsDropdown ? <FiX color="white" /> : <FiSettings color="white" />}
                </button>
                <div
                  className={`${
                    !settingsDropdown && "hidden"
                  } flex mt-28 sm:mt-16 z-10 flex-col p-5 gap-1 rounded-2xl bg-white absolute translate-y-16 -translate-x-12`}
                >
                  <button
                    onClick={handleOpenSettingsPopupClick}
                    className="border-b pb-1 text-left hover:text-theme-primary"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => navigate("/support")}
                    className="border-b pb-1 text-left hover:text-theme-primary"
                  >
                    Support
                  </button>
                  {user?.subs_status != "canceled" && (
                    <button
                      onClick={handleOpenSubsPopup}
                      className="border-b text-left hover:text-theme-primary"
                    >
                      Cancel Subscription
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/pricing")}
                    className="pb-1 text-left hover:text-theme-primary"
                  >
                    Change Subscription
                  </button>
                </div>
            <button
              onClick={handleLogoutClick}
              className="text-[#D62732] text-lg md:px-0 px-5 w-full lg:w-fit hover:text-primary-light py-2 md:text-left text-center capitalize font-semibold flex items-center gap-2 justify-center text-red-400 my-3"
              >
              <CgLogOff className=" text-2xl" /> Logout
            </button>
              </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
