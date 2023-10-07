import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PROPERTY_SERVICE_NAME,
  PROPERTY_PACKAGE_NAME,
} from 'src/pb/property.pb';
import { PROPERTY_MICROSERVICE_URL } from 'src/configs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROPERTY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: PROPERTY_MICROSERVICE_URL,
          package: [PROPERTY_PACKAGE_NAME],
          protoPath: 'node_modules/e-shop-nest-proto/proto/property.proto',
        },
      },
    ]),
  ],
  controllers: [PropertyController],
})
export class PropertyModule {}
