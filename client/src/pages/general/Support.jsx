import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { BsArrowLeftCircle } from "react-icons/bs";
import logo from "../../assets/logo-yellow.png";
import { Link } from "react-router-dom";
import {
  logout,
} from "../../api";
import { CgLogOff } from "react-icons/cg";

const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogoutClick = async () => {
    const res = await logout();
    res && navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = "NoteGenie Support";
    const mailtoLink = `mailto:help.notegenie@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`
    )}`;

    window.location.href = mailtoLink;
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="pb-16 pt-7">
      <div className="flex px-2 sm:px-5 md:px-10 mb-10 items-center justify-between">
        <div className="rounded-2xl bg-primary-dark flex justify-between px-1 md:px-5 py-1 md:py-0">
          <Link
            to="/"
            className="text-primary-dark font-semibold flex items-center gap-2 text-2xl"
          >
            <img src={logo} alt="NoteGenie logo" className=" w-20 md:w-32" />
          </Link>
        </div>
        {/* <div className="flex gap-2 ">
          <button
            onClick={(e) => navigate("/dashboard")}
            title="Back"
            className="text-2xl hover:text-gray-600"
          >
            <BsArrowLeftCircle />
          </button>
          <h2 className="text-primary-dark text-2xl font-medium uppercase">
            Contact Us
          </h2>
        </div> */}
        <button
            onClick={handleLogoutClick}
            title="Logout"
            className="text-2xl rounded-full h-fit hover:text-gray-500 text-red-500 flex items-center ml-3"
          >
            <span className="text-lg">Logout </span>
            <CgLogOff />
          </button>
      </div>
      <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
        <h3 className="text-3xl font-medium text-theme-primary text-center">
          Contact Us
        </h3>

        <form onSubmit={handleSubmit} className="md:w-4/5 mx-auto">
          <InputPrimary
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleFormDataChange}
          />
          <InputPrimary
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleFormDataChange}
          />
          <InputPrimary
            name="message"
            placeholder="Enter your message..."
            textarea={true}
            value={formData.message}
            onChange={handleFormDataChange}
          />
          <ButtonPrimary text="Contact Us" width="full" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Support;
