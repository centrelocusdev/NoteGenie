import React, { useEffect, useState } from "react";
import InputPrimary from "./InputPrimary";
import ButtonPrimary from "./ButtonPrimary";
import { getUserByToken, updateProfile } from "../api";

const SettingsPopup = ({ display }) => {
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
    profession: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const professions = [
    "healthcare-provider",
    "social-worker",
    "acupuncuturist",
    "educator",
    "psychologist",
    "mental-health-therapist",
    "chinese-herbal-medicine",
    "psychiatrist",
    "doctor",
    "physical-therapist",
    "occupational-therapist",
    "chiropractor",
    "speech-pathologist",
    "law-inforcement",
    "lawyer",
  ];

  useEffect(() => {
    const runIt = async () => {
      const u = await getUserByToken();
      setUser(u)
    };

    runIt();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    console.log(formData)
    const res = await updateProfile(formData);
    console.log(res)
    res && setIsLoading(false)
    display();
    window.location.reload()
  };

  return (
    <div className="w-screen min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center fixed">
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white p-8">
        <h4 className="text-4xl text-theme-primary text-center">
          Update Profile
        </h4>

        <div onChange={handleChange}>
          <InputPrimary
            name={"name"}
            value={user.name}
            placeholder={"enter your name"}
            disabled={true}
          />
          <InputPrimary
            name={"password"}
            value={formData.password}
            placeholder={"enter your new passaword"}
          />
          <InputPrimary
            name={"confirm_password"}
            value={formData.confirm_password}
            placeholder={"re-type your password"}
          />
          <label
            htmlFor="profession"
            className="capitalize text-lg block font-medium mt-3 text-gray-600"
          >
            Choose profession
          </label>
          <select
            value={formData.profession}
            name="profession"
            className="w-full appearance-none invalid:bg-gray-600 bg-[#D1D1D147] mt-1 px-6 py-3 rounded-full focus:outline-none "
          >
            <option value="">Select your profession</option>
            {professions.map((p) => (
              <option value={p} className="capitalize">
                {p}
              </option>
            ))}
          </select>

          <ButtonPrimary
            text={isLoading ? 'updating...' : 'update profile'}
            width={"full"}
            handleClick={handleSubmit}
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
