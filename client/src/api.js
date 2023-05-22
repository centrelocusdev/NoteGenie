import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify";

export const register = async (formData) => {
  try {
    const res = await axios.post(`${url}/register/`, formData);
    console.log(res)
    Cookies.set("notegenie", res.data.tokens.at(-1));
    toast.success("user logged in successfully");
    return true;
  } catch (err) {
    toast.error(err);
    return;
  }
};

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/login/`, formData);
    Cookies.set("notegenie", res.data.tokens.at(-1));
    toast.success("user logged in successfully");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const logout = async () => {
  Cookies.remove("access-token");
  Cookies.remove("refresh-token");
  try {
    const res = await axios.post(`${url}/logout/`, { refresh: refresh_token });
    res.data && toast.success("logging out");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const forgetPasswordConfirm = async (formData) => {
  try {
    const res = await axios.post(`${url}/password_reset/confirm/`, formData);
    res.data && toast.success("password changed successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

