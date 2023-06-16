import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  getUserByToken,
  createPaymentIntent,
  updateSubscription,
  createSubscription,
  attachPaymentMethod,
} from "../api";
import { Link } from "react-router-dom";
import InputPrimary from "./InputPrimary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StripeCheckoutForm = ({ plan }) => {
  const navigate = useNavigate();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [user, setUser] = useState("");
  const [price, setPrice] = useState(null);
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByToken();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (plan === "basic") {
      setPrice(Math.round(10.99 * 100));
    } else if (plan === "premium") {
      setPrice(Math.round(14.99 * 100));
    } else {
      toast.warning("Invalid plan chosen");
    }
  }, [plan]);

  const handleAddressChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    for (const key in address) {
      if (address[key] === "") {
        toast.error("Please enter the value of " + key);
        return;
      }
    }

    setPaymentLoading(true);

    try {
      const { name, email } = user;
      const paymentMethodRes = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
          address,
        },
      });

      if (paymentMethodRes.error) {
        toast.error(paymentMethodRes.error.message);
        setPaymentLoading(false);
        return;
      }

      const paymentMethodId = paymentMethodRes.paymentMethod.id;
      await attachPaymentMethod({ userId: user._id, paymentMethodId });
      await createSubscription({
        userId: user._id,
        plan,
        paymentMethodId: paymentMethodId,
      });

      // const paymentIntent = await createPaymentIntent({
      //   amount: price,
      //   currency: "usd",
      //   description: "NoteGenie Pro",
      //   customer: user.customer_id,
      //   payment_method: paymentMethodId,
      // });

      // if (paymentIntent.error) {
      //   toast.error(paymentIntent.error.message);
      //   setPaymentLoading(false);
      //   return;
      // }

      // if (paymentIntent.status === "requires_confirmation") {
      //   const result = await stripe.confirmCardPayment(
      //     paymentIntent.client_secret
      //   );

      //   if (result.error) {
      //     toast.error(result.error.message);
      //   } else {
      //     if (result.paymentIntent.status === "succeeded") {
      //       // await createSubscription({
      //       //   userId: user._id,
      //       //   plan,
      //       //   paymentMethodId: paymentMethodId,
      //       // });
      //       navigate(`/pricing?status=completed&plan=${plan}`);
      //     }
      //   }
      // } else if (
      //   paymentIntent.status === "requires_action" &&
      //   paymentIntent.next_action.type === "use_stripe_sdk"
      // ) {
      //   const result = await stripe.handleCardAction(
      //     paymentIntent.client_secret
      //   );

      //   if (result.error) {
      //     toast.error(result.error.message);
      //   } else {
      //     if (result.paymentIntent.status === "succeeded") {
      //       // await createSubscription({
      //       //   userId: user._id,
      //       //   plan,
      //       //   paymentMethodId: paymentMethodId,
      //       // });
      //       navigate(`/pricing?status=completed&plan=${plan}`);
      //     }
      //   }
      // }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="md:w-2/5 bg-white p-8 rounded-2xl"
      >
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-2xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 font-semibold uppercase">
            NoteGenie Pro
          </h2>
          <Link
            to={"/pricing"}
            className="italic font-medium text-gray-400 hover:underline"
          >
            Plan <span>{plan}</span>
          </Link>
        </div>
        <h2 className="text-xl mt-5 text-gray-500 font-semibold border-b">
          Please enter your address{" "}
          <span className="text-red-500" title="required">
            *
          </span>
        </h2>
        <div onChange={handleAddressChange}>
          <div className="flex flex-col sm:flex-row gap-2">
            <InputPrimary name="line1" placeholder={"123 Main St"} />
            <InputPrimary name="postal_code" placeholder={"10001"} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <InputPrimary name="city" placeholder={"New York"} />
            <InputPrimary name="state" placeholder={"NY"} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <InputPrimary
              name="country"
              placeholder={"2-letter country code i.e US"}
            />
          </div>
        </div>
        <h2 className="text-xl mt-5 text-gray-500 font-semibold border-b">
          Please enter your card details{" "}
          <span className="text-red-500" title="required">
            *
          </span>
        </h2>
        <CardElement className="w-full my-5 bg-[#D1D1D147] py-3 px-6 rounded-3xl" />
        <button
          disabled={isPaymentLoading}
          className="bg-theme-primary px-6 py-2 rounded-2xl w-full font-medium"
        >
          {isPaymentLoading ? "Loading..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
