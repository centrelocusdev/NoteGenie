import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import currency from "currency.js";

// const url = "https://ng.thedelvierypointe.com";
// const url = "http://127.0.0.1:8000";
const url = "https://notegenie-backened-testing.onrender.com";

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
    if (!/^[A-Za-z ]+$/.test(formData.name)) {
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
      !formData.profession ||
      !formData.terms
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
    return false;
  }
};

export const logout = async () => {
  Cookies.remove("notegenie");
  toast.success("logging out");
  return true;
};

export const startTrial = async (userId) => {
  try {
    const res = await axios.post(`${url}/start-trial`, { userId });
    const { status, message } = res.data;
    if (status == "success") {
      toast.success(message);
      return true;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const updateProfile = async (formData) => {
  try {
    const user = await getUserByToken();
    let res = "";
    if (formData.password) {
      console.log("only password");
      if (formData.password != formData.confirm_password) {
        toast.error("password doesn't match");
        return;
      }
      res = await axios.post(`${url}/update-profile?id=${user._id}`, {
        password: formData.password,
      });
    } else if (formData.profession) {
      console.log("only profession");
      res = await axios.post(`${url}/update-profile?id=${user._id}`, {
        profession: formData.profession,
      });
    } else if (formData.password && formData.profession) {
      console.log("password and profession");
      if (formData.password != formData.confirm_password) {
        toast.error("password doesn't match");
        return;
      }
      res = await axios.post(`${url}/update-profile?id=${user._id}`, {
        profession: formData.profession,
        password: formData.password,
      });
    }
    console.log(res);
    toast.success("profile updated successfully");
    const { status, data } = res.data;
    if (status == "success") {
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
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

export const getPredefinedTemplates = async (profession) => {
  try {
    const res = await axios.get(`${url}/predefined-templates/${profession}`);

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

export const getPredefinedTemplateById = async (id) => {
  try {
    const res = await axios.get(`${url}/predefined-template-by-id/${id}`);

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
    toast.error(message);
    return;
  }
};

export const createSubscription = async (formData) => {
  try {
    const res = await axios.post(`${url}/create-subscription`, formData);
    const { status, data } = res.data;
    if (status == "success") {
      window.sessionStorage.setItem("subsId", data.subsId);
      window.sessionStorage.setItem("clientSecret", data.clientSecret);
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

export const cancelSubcription = async (userId) => {
  try {
    const res = await axios.post(`${url}/cancel-subscription`, { userId });
    const { status, message } = res.data;
    if (status == "success") {
      toast.success(message);
      return;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const attachPaymentMethod = async (formData) => {
  try {
    const res = await axios.post(`${url}/attach-payment-method`, formData);
    const { status, message } = res.data;
    if (status == "success") {
      toast.success(message);
      return;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const updateSubsStatus = async (formData) => {
  try {
    const res = await axios.post(`${url}/update-subs-status`, formData);
    const { status, message } = res.data;
    if (status == "success") {
      toast.success(message);
      return;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const addSubscriber = async (formData) => {
  // console.log(formData);
  try {
    const res = await axios.post(`${url}/add-subscriber`, formData);
    const { status, message } = res.data;
    if (status == "success") {
      toast.success(message);
      return true;
    } else {
      return;
    }
  } catch (error) {
    const { status } = error.response;
    status == 500 &&
      toast.error(
        "This email is already in use, please try using a different email."
      );
    return;
  }
};

export const createCheckoutSession = async () => {
  try {
    const res = await axios.get(
      `${url}/create-checkout-session/${Cookies.get("notegenie")}`
    );
    const { status, message, session } = res.data;
    if (status == "success") {
      // toast.success(message);
      return { status: "success", session: session };
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const sendCheckoutId = async (id) => {
  try {
    const res = await axios.post(
      `${url}/attatchPaymentMethodToSubs/${Cookies.get("notegenie")}`,
      {
        CHECKOUT_SESSION_ID: id,
      }
    );
    const { status, message, subscription } = res.data;
    if (status == "success") {
      // console.log("subs", subscription);
      toast.success(message);
      return true;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};
export const updateCardDetails = async (formData) => {
  // console.log(formData);
  try {
    const res = await axios.post(
      `${url}/update-detailsof-default-paymentmethod/${Cookies.get(
        "notegenie"
      )}`,
      {
        card: formData,
      }
    );
    const { status, message } = res.data;
    if (status == "success") {
      toast.success(message);
      return true;
    } else {
      return;
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};

export const fetchCardDetails = async () => {
  try {
    const res = await axios.get(
      `${url}/cardDetails/${Cookies.get("notegenie")}`
    );
    // console.log("api", res);
    if (res.data.status === "success" && res.data.card) {
      return { status: "success", card: res.data.card };
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
    return;
  }
};
