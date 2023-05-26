import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const url = 'https://ng.thedelvierypointe.com'

export const getUserByToken = async () => {
  try {
    const res = await axios.get(`${url}/user/${Cookies.get('notegenie')}`)
    return res.data
  } catch (err) {
    toast.error(err);
    return;
  }
}

export const register = async (formData) => {
  try {
    const res = await axios.post(`${url}/register/`, formData);
    Cookies.set("notegenie", res.data.token);
    toast.success("user registered successfully");
    return true;
  } catch (err) {
    toast.error(err);
    return;
  }
};

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/login/`, formData);
    res && Cookies.set("notegenie", res.data.token);
    toast.success("user logged in successfully");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const logout = async () => {
  Cookies.remove("notegenie");
  toast.success("logging out");
  return true
  // try {
  //   const res = await axios.post(`${url}/logout/`, { token });
  //   res && toast.success("logging out");
  //   return true;
  // } catch (err) {
  //   toast.error(err.response.data.error);
  //   return;
  // }
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

