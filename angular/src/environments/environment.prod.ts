import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'TeduEcommerce',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44342/',
    redirectUri: baseUrl,
    clientId: 'TeduEcommerce_App',
    responseType: 'code',
    scope: 'offline_access TeduEcommerce',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44396',
      rootNamespace: 'TeduEcommerce',
    },
  },
  BACKEND_PAYMENT_URL: 'http://localhost:8888',
} as Environment;
