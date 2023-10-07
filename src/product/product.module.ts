import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from '../pb/product.pb';
import { ProductController } from './product.controller';
import { PropertyModule } from './property/property.module';
import { PropertyCategoryModule } from './property-category/property-category.module';
import { ProductPropertyModule } from './product-property/product-property.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50100',
          package: [PRODUCT_PACKAGE_NAME],
          protoPath: 'node_modules/e-shop-nest-proto/proto/product.proto',
        },
      },
    ]),

    PropertyModule,
    PropertyCategoryModule,
    ProductPropertyModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
