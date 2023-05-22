import React, { useState } from "react";
import logo from "../../assets/logo.png";
import {
  FiSearch,
  FiPlus,
  FiFileText,
  FiTrash,
  FiX,
  FiMenu,
  FiStar,
  FiArchive,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import ellipse from "../../assets/ellipse-blue.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <div className="w-full capitalize">
      <div className="flex justify-between p-4 md:hidden md:w-[80%]">
        <Link to={"/"} onClick={closeSidebar}>
          <img src={logo} alt="NoteGenie logo" className="w-12" />
        </Link>
        <button
          onClick={handleMenuClick}
          className="text-blue px-4 py-2 text-xl rounded-full bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(255,255,255,0.1)]"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <div
        className={`${
          isOpen ? "block md:hidden absolute z-10 bg-dark" : "hidden md:block static"
        } min-h-screen max-h-min py-12 px-7 md:bg-[rgba(0,0,0,0.1)]`}
      >
        <img
          src={ellipse}
          className="absolute z-60 w-[60%] mx-auto -translate-y-16 hidden md:block -translate-x-[50%]"
        />

        <div className={`relative flex flex-col gap-6 w-full`}>
          <div className="md:flex hidden gap-5 justify-between items-center">
            <Link to={"/"}>
              <img src={logo} alt="NoteGenie logo" className="w-12" />
            </Link>
            <button className="text-blue p-3 rounded-full bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(255,255,255,0.1)]">
              <FiSearch />
            </button>
          </div>

          <Link to={'/dashboard/editor'} onClick={closeSidebar} className="w-full mx-auto flex gap-3 rounded-full text-white bg-[rgba(0,0,0,0.3)] justify-center items-center py-2 px-3">
            <FiPlus /> <span className="truncate">New Note</span>
          </Link>

          <ul className="text-gray text-md">
            <h6 className="text-sm text-gray font-medium">Recents</h6>
            {recents.map(({ text, icon }, key) => (
              <li key={key} className="my-2">
                <Link
                  to={"#"}
                  onClick={closeSidebar}
                  className="flex gap-2 items-center hover:text-white"
                >
                  {icon}{" "}
                  <span className="truncate overflow-ellipsis w-full">
                    {text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link to={'/dashboard/templates'} onClick={closeSidebar} className="w-full mx-auto flex gap-3 rounded-full text-white bg-[rgba(0,0,0,0.3)] justify-center items-center py-2 px-3">
            <FiSearch /> <span className="truncate">Explore Templates</span>
          </Link>

          <ul className="text-gray text-md">
            <h6 className="text-sm text-gray font-medium">More</h6>
            {more.map(({ text, icon, url }, key) => (
              <li key={key} className="my-2">
                <Link
                  to={url}
                  onClick={closeSidebar}
                  className="flex gap-2 items-center hover:text-white"
                >
                  {icon} {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const recents = [
  {
    text: "Reflection on the Month of June",
    icon: <FiFileText />,
  },
  {
    text: "Project proposal",
    icon: <FiFileText />,
  },
  {
    text: "Travel itinerary",
    icon: <FiFileText />,
  },
];

const more = [
  {
    text: "favorites",
    icon: <FiStar />,
    url: '/dashboard/favorites'
  },
  {
    text: "Trash",
    icon: <FiTrash />,
    url: '/trash'
  },
  {
    text: "archived notes",
    icon: <FiArchive />,
    url: '/'
  },
];

export default Sidebar;
