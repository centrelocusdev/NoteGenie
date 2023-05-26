import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = "NoteGenie Support";
    const mailtoLink = `mailto:rupali.h@esrotlab.com?subject=${encodeURIComponent(
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
    <div className="py-16">
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
