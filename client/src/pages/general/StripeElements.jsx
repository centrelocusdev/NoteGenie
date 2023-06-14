import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_live_51NEAMgHDuMBRsT9CYjrgyPqzM13FmUVvoZXdhloHQAq5vmeqdSFE9g3ur5SJxeSBhKDWTKV3UbFygqaqHdCPYlGm00Vr8bjCmw"
);

const StripeElements = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get("price");
  const plan = queryParams.get("plan");

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} plan={plan} />
    </Elements>
  );
};

export default StripeElements;
