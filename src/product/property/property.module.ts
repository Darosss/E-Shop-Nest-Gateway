import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PROPERTY_SERVICE_NAME,
  PROPERTY_PACKAGE_NAME,
} from 'src/pb/property.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROPERTY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50103',
          package: [PROPERTY_PACKAGE_NAME],
          protoPath: 'node_modules/e-shop-nest-proto/proto/property.proto',
        },
      },
    ]),
  ],
  controllers: [PropertyController],
})
export class PropertyModule {}
