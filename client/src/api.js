import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// const url = "https://ng.thedelvierypointe.com";
const url = "http://127.0.0.1:8000";

export const getUserByToken = async () => {
  try {
    const res = await axios.get(`${url}/user/${Cookies.get("notegenie")}`);
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const register = async (formData) => {
  try {
    if (!/^[A-Za-z]+$/.test(formData.name)) {
      toast.warning("Name should only include alphabets");
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}/.test(formData.password)
    ) {
      toast.warning(
        "password should have at least 6 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
    } else if (formData.password !== formData.confirm_password) {
      toast.warning("password doesn't match");
      return;
    } else if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.profession
    ) {
      toast.warning("All fields are mendatory");
    } else {
      const res = await axios.post(`${url}/register/`, formData);
      Cookies.set("notegenie", res.data.data.token);
      toast.success("user registered successfully");
      return true;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/login/`, formData);
    Cookies.set("notegenie", res.data.data.token);
    toast.success("user logged in successfully");
    return true;
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
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
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const forgetPasswordConfirm = async (formData) => {
  try {
    const res = await axios.post(`${url}/password_reset/confirm/`, formData);
    res.data && toast.success("password changed successfully");
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const createTemplate = async (formData) => {
  try {
    const res = await axios.post(`${url}/create-template`, formData);

    toast.success("template created successfully");
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const getAllTemplates = async (userId) => {
  try {
    const res = await axios.get(`${url}/get-templates/${userId}`);

    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const deleteTemplate = async (id) => {
  try {
    const res = await axios.delete(`${url}/delete-template/${id}`);
    res && toast.success("template deleted successfully");
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const getTemplate = async (id) => {
  try {
    const res = await axios.get(`${url}/get-template/${id}`);
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const sendPrompt = async (formData) => {
  try {
    const res = await axios.post(`${url}/send-prompt`, formData);
    toast.success("Magic Note completed!");
    if (!res.data.error) {
      const { status, data } = res.data;
      if (status == "success") {
        return data;
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const noteCount = async (id) => {
  try {
    await axios.post(`${url}/count-note?id=${id}`);
  } catch (err) {
    toast.error(err.err);
    return;
  }
};

export const createPaymentIntent = async (formData) => {
  try {
    const res = await axios.post(`${url}/create-payment-intent`, formData);
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const retrievePaymentIntent = async (formData) => {
  try {
    const res = await axios.post(`${url}/retrieve-payment-intent`, formData);
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const confirmPayment = async (formData) => {
  try {
    const res = await axios.post(`${url}/confirm-payment`, formData);
    toast.success("Hurrey! payment confirmed!");
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
    // toast.error(message);
    return;
  }
};

export const updateSubscription = async (formData) => {
  try {
    const res = await axios.post(`${url}/update-subscription`, formData);
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const getSubscription = async (subsId) => {
  try {
    const res = await axios.post(`${url}/subscription`, { subsId });
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};
