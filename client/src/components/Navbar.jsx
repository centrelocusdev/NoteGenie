import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiXOctagon } from "react-icons/fi";
import Scroll from "react-scroll";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

const Goto = Scroll.Link;

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const handleClick = () => {
    setSidebar((prev) => !prev);
  };

  const navItems = ["home", "features", "about us", "support"];

  return (
    <div className="w-full py-3 top-0">
      <div className="flex flex-wrap flex-col md:flex-row justify-between md:items-center md:px-12">
        <div className="flex justify-between px-5 relative">
          <Link
            to="/"
            className="text-primary-dark font-semibold flex items-center gap-2 text-2xl"
          >
            <img src={logo} alt="NoteGenie logo" className="w-32" />
          </Link>
          <button
            onClick={handleClick}
            className="cursor-pointer md:hidden float-right right-0 relative text-primary-dark w-fit text-xl"
          >
            <FaBars />
          </button>
        </div>
        <ul
          className={`z-10 h-screenlist-none md:flex items-center text-gray-200  text-md text-left md:static fixed h-full md:w-auto md:bg-[transparent] top-0 md:space-y-0 overflow-hidden transition-all ${
            sidebar ? "w-[100%] " : "w-0"
          } md:pt-0 pt-10`}
          style={{
            backdropFilter: "blur(50px)",
          }}
        >
          <li
            onClick={handleClick}
            className="md:hidden float-right mr-3 text-gray -mt-6 text-2xl cursor-pointer"
          >
            <FiXOctagon />
          </li>
          {navItems.map((name, index) => (
            <li key={index}>
              <Goto to={name} spy={true} smooth={true} duration={250}>
                <button className="text-primary-dark text-lg mx-1 px-5 w-full lg:w-fit hover:text-secondary-dark hover:bg-theme-primary rounded-xl py-2 md:text-left text-center capitalize font-semibold">
                  {name}
                </button>
              </Goto>
            </li>
          ))}
          <li className="md:hidden text-gray text-lg mx-auto md:px-0 px-5 w-full text-center flex flex-col w-fit">
            <Link
              to="/login"
              className="text-primary-dark text-lg mx-3 md:px-0 px-5 w-full lg:w-fit hover:text-primary-dark py-2 md:text-left text-center capitalize"
            >
             Login
            </Link>
            <Link
              to="/signup"
              className="text-primary-dark text-lg mx-3 md:px-0 px-5 w-full lg:w-fit hover:text-primary-dark py-2 md:text-left text-center capitalize"
            >
              Sign up
            </Link>
          </li>
        </ul>
        <div className="md:flex items-center hidden">
          <Link
            to="/login"
            className="text-primary-dark text-lg mx-4 mt-5  font-semibold md:px-0 px-5 w-full lg:w-fit lg:border-transparent hover:border-yellow-500 hover:text-yellow-500 py-1 text-left"
          >
            Login
          </Link>
          <ButtonPrimary text={"sign up"} handleClick={(e) => navigate('/signup')} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
