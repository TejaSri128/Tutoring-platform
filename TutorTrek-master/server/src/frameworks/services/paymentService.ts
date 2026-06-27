import configKeys from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
  // maxNetworkRetries: 2,
  // timeout: 3000,
  // telemetry: false
});

export const paymentService = () => {
  const createPaymentIntent = async (amount: number, courseId: string, studentId: string) => {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'INR',
      amount: amount*100,
      automatic_payment_methods: { enabled: true },
      metadata: { courseId, studentId }
    });
    return paymentIntent;
  };

  const getConfig = () => configKeys.STRIPE_PUBLISHABLE_KEY;

  const verifyWebhookSignature = (rawBody: any, signature: string) => {
    return stripe.webhooks.constructEvent(rawBody, signature, configKeys.STRIPE_WEBHOOK_SECRET || '');
  };

  return {
    createPaymentIntent,
    getConfig,
    verifyWebhookSignature
  };
};

export type PaymentServiceImpl = typeof paymentService;
