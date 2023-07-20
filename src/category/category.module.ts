import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATEGORY_PACKAGE_NAME, CATEGORY_SERVICE_NAME } from './pb/category.pb';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: CATEGORY_PACKAGE_NAME,
          protoPath: 'node_modules/e-shop-nest-proto/proto/category.proto',
        },
      },
    ]),
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
