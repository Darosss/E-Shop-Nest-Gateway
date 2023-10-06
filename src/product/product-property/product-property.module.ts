import { Module } from '@nestjs/common';

import { ProductPropertyController } from './product-property.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PRODUCT_PROPERTY_SERVICE_NAME,
  PRODUCT_PROPERTY_PACKAGE_NAME,
} from 'src/pb/product-property.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PROPERTY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50102',
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
