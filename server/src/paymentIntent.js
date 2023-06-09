const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/** 
 * @param
 * @name: name of the user
 * @email: email of the user
 */
router.post('/create-customer', async (req,res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email
    })

    res.status(200).send(customer)
  } catch (err) {
    res.status(400).send({err: err.message})
  }
})


router.post('/add-card', async (req,res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email
    })

    res.status(200).send(customer)
  } catch (err) {
    res.status(400).send({err: err.message})
  }
})

router.post('/create-payment-intent', async (req, res) => {
  try {
    const {amount, currency} = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: 'This is test payment to INR'
      // Add any additional parameters as required
    });
   
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).send({err: err.message})
  }
});

module.exports = router