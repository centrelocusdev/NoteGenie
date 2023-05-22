import React from "react";
import Navbar from "../../components/Navbar";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="pb-16">
      <Navbar />

      <div className="md:w-2/5 md:mt-16 p-8 mx-auto rounded-2xl bg-white shadow-lg">
        <h3 className="text-3xl font-medium text-theme-primary text-center">
          Sign In
        </h3>
        <p className="text-center my-4">
          Don't have an account? Sign up{" "}
          <Link to={"/signup"} className="underline">
            Now
          </Link>
        </p>

        <form className="md:w-4/5 mx-auto">
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholer={"johndoe@gmail.com"}
          />
          <InputPrimary
            type={"password"}
            name={"password"}
            placeholer={"Enter strong password"}
          />
          <ButtonPrimary text={"login"} width={"full"} />

          <p className="text-2xl text-center text-slate-400">OR</p>
          <ButtonPrimary text={"contibue with google"} isDark={true} width={'full'} icon={<BsGoogle />} />
        </form>
      </div>
    </div>
  );
};

export default Login;
