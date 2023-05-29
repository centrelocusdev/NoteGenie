import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify";

// const url = 'https://ng.thedelvierypointe.com'
const url = 'http://127.0.0.1:8000'

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
    if(!formData.name || !formData.email || !formData.password || !formData.profession) {
      toast.error('all fields are mendatory')
    } else if (formData.password !== formData.confirm_password) {
      toast.error("password doesn't match")
      return
    } else {
      const res = await axios.post(`${url}/register/`, formData);
      Cookies.set("notegenie", res.data.token);
      toast.success("user registered successfully");
      return true;
    }
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
};

export const updateProfile = async () => {
  try {
    const user = await getUserByToken()
    console.log(user)
    const res = await axios.post(`${url}/update-profile?id=${user.id}`, formData)

    toast.success('profile updated successfully')
    return res.data
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
}

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

