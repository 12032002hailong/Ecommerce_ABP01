import createInstanceAxios from './axios.customize';

import { environment } from 'src/environments/environment';

const paymentUrl = environment.BACKEND_PAYMENT_URL;

const axiosPayment = createInstanceAxios(paymentUrl);

export const getVNPayUrlAPI = (amount: number, locale: string, paymentRef: string) => {
  const urlBackend = '/vnpay/payment-url';
  return axiosPayment.post<IBackendRes<{ url: string }>>(urlBackend, {
    amount,
    locale,
    paymentRef,
  });
};
