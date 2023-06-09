import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "https://ng.thedelvierypointe.com";
// const url = 'http://127.0.0.1:8000'

export const getUserByToken = async () => {
  try {
    const res = await axios.get(`${url}/user/${Cookies.get("notegenie")}`);
    return res.data;
  } catch (err) {
    toast.error(err);
    return;
  }
};

export const register = async (formData) => {
  try {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.profession
    ) {
      toast.error("all fields are mendatory");
    } else if (formData.password !== formData.confirm_password) {
      toast.error("password doesn't match");
      return;
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
    return res.data;
  } catch (err) {
    console.log(err.response.data.err);
    toast.error(err.response.data.err);
    return;
  }
};

export const logout = async () => {
  Cookies.remove("notegenie");
  toast.success("logging out");
  return true;
};

export const updateProfile = async (formData) => {
  try {
    if (formData.password != formData.confirm_password) {
      toast.error("password doesn't match");
      return;
    }
    const user = await getUserByToken();
    const res = await axios.post(`${url}/update-profile?id=${user.id}`, {
      password: formData.password,
      profession: formData.profession,
    });

    toast.success("profile updated successfully");
    return res.data;
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

export const createTemplate = async (formData) => {
  try {
    const res = await axios.post(`${url}/create-template`, formData);

    toast.success("template created successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAllTemplates = async (userId) => {
  try {
    const res = await axios.get(`${url}/get-templates/${userId}`);

    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const deleteTemplate = async (id) => {
  try {
    const res = await axios.delete(`${url}/delete-template/${id}`);
    res && toast.success("template deleted successfully");
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getTemplate = async (id) => {
  try {
    const res = await axios.get(`${url}/get-template/${id}`);
    return res.data
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
}

export const sendPrompt = async (formData) => {
  try {
    const res = await axios.post(`${url}/send-prompt`, formData)
    toast.success('Magic Note completed!')
    if(!res.data.error) {
      return res.data
    } else {
      return
    }   
  } catch (err) {
    toast.error(err.err);
    return;
  }
}

export const noteCount = async (id) => {
  try {
    await axios.post(`${url}/count-note?id=${id}`)
  } catch (err) {
    toast.error(err.err);
    return;
  }
}

export const createPaymentIntent = async (formData) => {
  try {
    const res = await axios.post(`${url}/create-payment-intent`, formData)
    toast.success('payment intent created!')
    return res.data
  } catch (err) {
    console.log(err.err)
    toast.error(err.err);
    return;
  }
}

export const retrievePaymentIntent = async (formData) => {
  try {
    const res = await axios.post(`${url}/retrieve-payment-intent`, formData)
    toast.success('payment intent retrieved!')
    return res.data
  } catch (err) {
    console.log(err.err)
    toast.error(err.err);
    return;
  }
}

export const confirmPayment = async (formData) => {
  try {
    const res = await axios.post(`${url}/confirm-payment`, formData)
    toast.success('Hurrey! payment confirmed!')
    return res.data
  } catch (err) {
    console.log(err)
    toast.error(err.err);
    return;
  }
}