import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_KEY;
const stripe = Stripe(stripeKey);


// stripe(stripeKey);

class stripeClass {
  static async charge(payload) {
    const {
      amount, description, source, order_id
    } = payload;
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      description,
      source,
      metadata: {
        order_id
      },
    });
    return charge;
  }
}

export default stripeClass;
