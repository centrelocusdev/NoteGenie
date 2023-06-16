const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
const User = require("./userModal");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, description, customer, payment_method } =
      req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      customer,
      payment_method,
      payment_method_types: ["card"],
    });

    const { status, client_secret, id } = paymentIntent;
    res.send({
      status: "success",
      data: {
        status,
        client_secret,
        id,
      },
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/create-subscription", async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const user = await User.findById(userId);

    let price;
    if (plan == "basic") price = process.env.BASIC_PRICE_ID_TEST;
    else if (plan == "premium") price = process.env.PREMIUM_PRICE_ID_TEST;
    else return;

    const subs = await stripe.subscriptions.create({
      customer: user.customer_id,
      cancel_at_period_end: true,
      items: [
        {
          price,
        },
      ],
    });

    user.subs_id = subs.id
    user.subs_plan = plan
    user.subs_status = subs.status
    user.trial = false;
    await user.save();

    res.status(200).send({
      status: "success",
      message: "subscription created successfully",
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/update-subscription", async (req, res) => {
  try {
    const { userId, subsId, plan } = req.body;
    let price;
    if (plan == "basic") price = process.env.BASIC_PRICE_ID_TEST;
    else if (plan == "premium") price = process.env.PREMIUM_PRICE_ID_TEST;
    else return;

    const period30Days = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

    await stripe.subscriptions.update(subsId, {
      trial_end: "now",
      billing_cycle_anchor: period30Days,
      cancel_at_period_end: false,
      items: [
        {
          price,
        },
      ],
    });

    const user = await User.findById(userId);
    user.subs_plan = plan;
    user.note_count = 0;
    user.trial = false;
    await user.save();
    res.status(200).send({
      status: "success",
      message: "updated subscription successfully",
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/subscription", async (req, res) => {
  try {
    const { subsId } = req.body;
    const subs = await stripe.subscriptions.retrieve(subsId);
    res.status(200).send({ status: "success", data: subs });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/update-subscription-trial", async (req, res) => {
  try {
    const { subsId } = req.body;
    const subs = await stripe.subscriptions.update(subsId, {
      trial_end: "now",
    });
    res.status(200).send({ status: "success", data: subs });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/cancel-subscription", async (req, res) => {
  try {
    const subs = await stripe.subscriptions.cancel(req.body.subsId);
    res.status(200).send({ status: "success", message: subs.status });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/attach-payment-method", async (req, res) => {
  try {
    const { userId, paymentMethodId } = req.body
    const user = await User.findById(userId)
    await stripe.paymentMethods.attach(paymentMethodId, { customer: user.customer_id });

    await stripe.customers.update(user.customer_id, {
    invoice_settings: {
      default_payment_method: paymentMethodId
    }
   })

   res.status(200).send({
    status: "success",
    message: "payment method has been attached successfully",
  });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
})

module.exports = router;
