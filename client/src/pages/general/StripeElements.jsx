import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51N6qwVSD0OCqj199xSjuaGe5L0Zkmkl5ZU2bVIeca1rT4cWSJGL5iw6bLeU1BTGnENmMbTCyBy6U9awIQz3bSyNn00gS4vAsxv"
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
