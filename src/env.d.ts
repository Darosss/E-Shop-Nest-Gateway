export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_MICROSERVICE_URL: string;
      CATEGORY_MICROSERVICE_URL: string;
      PRODUCT_MICROSERVICE_URL: string;
      ORDER_MICROSERVICE_URL: string;
      PROPERTY_CATEGORY_MICROSERVICE_URL: string;
      PRODUCT_PROPERTY_MICROSERVICE_URL: string;
      PROPERTY_MICROSERVICE_URL: string;
    }
  }
}
