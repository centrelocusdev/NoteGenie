import React, { useState } from "react";
import InputPrimary from "./InputPrimary";
import ButtonPrimary from "./ButtonPrimary";
import { updateProfile } from "../api";

const SettingsPopup = ({ display }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirm_password: "",
  });
  const [profession, setProfession] = useState();
  const professions = ['healthcare provider', 'social worker', 'acupuncuturist', 'educator', 'psychologist', 'mental health therapist', 'chinese herbal medicine', 'psychiatrist', 'doctor', 'physical therapist', 'occupational therapist', 'chiropractor', 'speech pathologist', 'law inforcement', 'lawyer']

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile({...formData, profession})
    display()
  };

  return (
    <div className="w-screen min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center fixed">
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white p-8">
        <h4 className="text-4xl text-theme-primary text-center">
          Update Profile
        </h4>

        <div onChange={handleChange}>
          <InputPrimary name={"name"} placeholder={"enter your name"} />
          <InputPrimary
            name={"password"}
            placeholder={"enter your new passaword"}
          />
          <InputPrimary
            name={"confirm_password"}
            placeholder={"re-type your password"}
          />

          <select value={profession} onChange={handleProfessionChange} className="w-full invalid:bg-gray-600 bg-[#D1D1D147] mt-5 px-6 py-3 rounded-full focus:outline-none ">
            <option value="">Select an option</option>
            {professions.map(p => (
              <option value={p} className="capitalize">{p}</option>
            ))}
          </select>

          <ButtonPrimary
            text={"update prfile"}
            width={"full"}
            onClick={handleSubmit}
          />
          <button
            onClick={display}
            className="text-gray-500 text-center w-full mt-3 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
