import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CustomRequest } from '../../types/customRequest';
import { enrollStudentU } from '../../app/usecases/course/enroll';
import {
  createPaymentIntentU,
  getConfigU
} from '../../app/usecases/payment/stripe';
import { PaymentServiceInterface } from '../../app/services/paymentServiceInterface';
import { PaymentServiceImpl } from '../../frameworks/services/paymentService';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { PaymentInterface } from '../../app/repositories/paymentDbRepository';
import { PaymentImplInterface } from '../../frameworks/database/mongodb/repositories/paymentRepoMongodb';

const paymentController = (
  paymentServiceInterface: PaymentServiceInterface,
  paymentServiceImpl: PaymentServiceImpl,
  courseDbInterface: CourseDbRepositoryInterface,
  courseDbImpl: CourseRepositoryMongoDbInterface,
  paymentDbInterface: PaymentInterface,
  paymentDbImpl: PaymentImplInterface
) => {
  const paymentService = paymentServiceInterface(paymentServiceImpl());
  const dbRepositoryCourse = courseDbInterface(courseDbImpl());
  const dbRepositoryPayment = paymentDbInterface(paymentDbImpl());

  const getConfig = asyncHandler(async (req: Request, res: Response) => {
    const config = getConfigU(paymentService);
    res.status(200).json({
      status: 'success',
      message: 'Successfully completed payment',
      data: config
    });
  });

  const createPaymentIntent = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { courseId }: { courseId: string } = req.body;
      const studentId = req.user?.Id || '';
      const response = await createPaymentIntentU(
        courseId,
        studentId,
        dbRepositoryCourse,
        paymentService
      );
      const { client_secret } = response;
      res.status(200).json({
        status: 'success',
        message: 'Successfully completed payment',
        data: {
          clientSecret: client_secret
        }
      });
    }
  );

  const handleWebhook = asyncHandler(async (req: any, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    let event;

    try {
      event = paymentService.verifyWebhookSignature(req.rawBody, signature);
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      const courseId = paymentIntent.metadata?.courseId;
      const studentId = paymentIntent.metadata?.studentId;

      if (courseId && studentId) {
        const paymentInfo = {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          payment_method: paymentIntent.payment_method_types?.[0] || 'card',
          status: 'succeeded'
        };

        await enrollStudentU(
          courseId,
          studentId,
          paymentInfo,
          dbRepositoryCourse,
          dbRepositoryPayment
        );
        console.log(`Successfully enrolled student ${studentId} in course ${courseId} via Stripe Webhook.`);
      } else {
        console.warn('Stripe Webhook payment_intent.succeeded missing courseId or studentId in metadata.');
      }
    }

    res.status(200).json({ received: true });
  });

  return {
    getConfig,
    createPaymentIntent,
    handleWebhook
  };
};

export default paymentController;
