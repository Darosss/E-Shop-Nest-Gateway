import { Module } from '@nestjs/common';
import { PropertyCategoryController } from './property-category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PROPERTY_CATEGORIES_SERVICE_NAME,
  PROPERTY_CATEGORY_PACKAGE_NAME,
} from 'src/pb/property-category.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROPERTY_CATEGORIES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50101',
          package: [PROPERTY_CATEGORY_PACKAGE_NAME],
          protoPath:
            'node_modules/e-shop-nest-proto/proto/property-category.proto',
        },
      },
    ]),
  ],
  controllers: [PropertyCategoryController],
})
export class PropertyCategoryModule {}
