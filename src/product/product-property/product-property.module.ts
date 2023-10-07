import { Module } from '@nestjs/common';

import { ProductPropertyController } from './product-property.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PRODUCT_PROPERTY_SERVICE_NAME,
  PRODUCT_PROPERTY_PACKAGE_NAME,
} from 'src/pb/product-property.pb';
import { PRODUCT_PROPERTY_MICROSERVICE_URL } from 'src/configs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PROPERTY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: PRODUCT_PROPERTY_MICROSERVICE_URL,
          package: [PRODUCT_PROPERTY_PACKAGE_NAME],
          protoPath:
            'node_modules/e-shop-nest-proto/proto/product-property.proto',
        },
      },
    ]),
  ],
  controllers: [ProductPropertyController],
})
export class ProductPropertyModule {}
