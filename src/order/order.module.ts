import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from '../pb/order.pb';
import { OrderController } from './order.controller';
import { ORDER_MICROSERVICE_URL } from 'src/configs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: ORDER_MICROSERVICE_URL,
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/e-shop-nest-proto/proto/order.proto',
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
