import { PaymentServiceImpl } from '../../frameworks/services/paymentService';

export const paymentServiceInterface = (
  service: ReturnType<PaymentServiceImpl>
) => {
  const createPaymentIntent = async (amount: number, courseId: string, studentId: string) => await service.createPaymentIntent(amount, courseId, studentId);

  const getConfig = () => service.getConfig();

  const verifyWebhookSignature = (rawBody: any, signature: string) => service.verifyWebhookSignature(rawBody, signature);

  return {
    createPaymentIntent,
    getConfig,
    verifyWebhookSignature
  };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
