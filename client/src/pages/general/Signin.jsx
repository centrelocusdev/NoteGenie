import React, { useState } from "react";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { login } from "../../api";

const Signin = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirectTo = state?.from ? state.from : "/dashboard";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await login(formData);
    res && setFormData(false)
    res && navigate(redirectTo);
  };

  return (
    <div className="py-16">
      <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
        <h3 className="text-3xl font-medium text-theme-primary text-center">
          Sign In
        </h3>
        <p className="text-center my-4">
          Don't have an account? Sign up{" "}
          <Link to={"/signup"} className="underline">
            Now
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          onChange={handleFormDataChange}
          className="md:w-4/5 mx-auto"
        >
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputPrimary
            type={"password"}
            name={"password"}
            placeholder={"Enter strong password"}
          />
          <ButtonPrimary text={isLoading ? 'logging in...' : 'login'} width={"full"} />

          {/* <p className="text-2xl text-center text-slate-400">OR</p>
          <ButtonPrimary
            text={"contibue with google"}
            isDark={true}
            width={"full"}
            icon={<BsGoogle />}
          /> */}
        </form>
        <div className="text-center w-full mt-5">
        <Link
          to={"/"}
          className="text-gray-500 mt-5 underline hover:text-primary-dark"
        >
          Go Back
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
