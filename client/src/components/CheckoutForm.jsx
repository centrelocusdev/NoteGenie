import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  getUserByToken,
  createPaymentIntent,
  updateSubscription,
  convertCurrency,
} from "../api";
import { Link } from "react-router-dom";
import InputPrimary from "./InputPrimary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import currency from "currency.js";

const StripeCheckoutForm = ({ price, plan }) => {
  const navigate = useNavigate();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [user, setUser] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const runIt = async () => {
      const user = await getUserByToken();
      if (user.subs_plan != "free") {
        toast.warning("You have already purchased a plan");
        // navigate("/dashboard");
        // return;
      }
      setUser(user);
    };

    runIt();
  }, []);

  useEffect(() => {
    const runIt = async () => {
      const amount = await convertCurrency('usd', 'inr', '14.99')
      console.log(amount)
    }

    runIt()
  }, [])

  const handleAddressChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    Object.keys(address).map((key) => {
      if (address[key] == "") {
        toast.warning("please enter the value of " + key);
        return;
      }
    });

    if (currency == "") {
      toast.warning("please specify your currency ");
      return;
    }

    setPaymentLoading(true);
    const { name, email } = user;
    try {
      const paymentMethodRes = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
          address,
        },
      });

      let paymentMethod = paymentMethodRes.paymentMethod;
      if (paymentMethod) {
        const paymentIntent = await createPaymentIntent({
          amount: Math.round(price * 100),
          currency,
          description: "NoteGenie Pro",
          customer: user.customer_id,
          payment_method: paymentMethod.id,
        });
        console.log(paymentIntent);
        if (paymentIntent) {
          if (paymentIntent.status === "requires_confirmation") {
            stripe
              .confirmCardPayment(paymentIntent.client_secret)
              .then(async (result) => {
                if (result.error) {
                  console.log(result.error.message);
                } else {
                  if (result.paymentIntent.status == "succeeded") {
                    console.log(true);
                    await updateSubscription({
                      userId: user._id,
                      subsId: user.subs_id,
                      plan,
                      price,
                      currency,
                    });
                    setPaymentLoading(false);
                    navigate(`/pricing?status=completed&plan=${plan}`);
                  }
                }
              });
          } else if (
            paymentIntent.status === "requires_action" &&
            paymentIntent.next_action.type === "use_stripe_sdk"
          ) {
            stripe
              .handleCardAction(paymentIntent.client_secret)
              .then(async (result) => {
                if (result.error) {
                  console.log(result.error.message);
                } else {
                  if (result.paymentIntent.status == "succeeded") {
                    await updateSubscription({
                      userId: user._id,
                      subsId: user.subs_id,
                      plan,
                      price,
                      currency,
                    });
                    setPaymentLoading(false);
                    navigate(`/pricing?status=completed&plan=${plan}`);
                  }
                }
              });
          }
        }
      }
    } catch (err) {
      console.log(err);
      setPaymentLoading(false);
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
        <div onChange={handleAddressChange}>
          <h2 className="text-xl mt-5 text-gray-500 font-semibold border-b">
            Please enter your address{" "}
            <span className="text-red-500" title="required">
              *
            </span>
          </h2>
          <InputPrimary
            name="currency"
            placeholder={"3-letter ISO currency code"}
            onChange={handleCurrencyChange}
          />
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
