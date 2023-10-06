import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import {
  CreatePropertyRequest,
  FindAllPropertyResponse,
  FindOnePropertyResponse,
  PROPERTY_SERVICE_NAME,
  PropertyOperationResponse,
  PropertyServiceClient,
  UpdatePropertyRequest,
} from 'src/pb/property.pb';

@Controller()
export class PropertyController implements OnModuleInit {
  private propertySvc: PropertyServiceClient;

  @Inject(PROPERTY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.propertySvc = this.client.getService<PropertyServiceClient>(
      PROPERTY_SERVICE_NAME,
    );
  }

  @Get('all')
  @UseGuards(AuthGuard)
  private async findManyProperties(): Promise<
    Observable<FindAllPropertyResponse>
  > {
    return this.propertySvc.findAll({});
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createProperty(
    @Body() body: CreatePropertyRequest,
  ): Promise<Observable<PropertyOperationResponse>> {
    return this.propertySvc.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  private async updateProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePropertyRequest,
  ): Promise<Observable<PropertyOperationResponse>> {
    return this.propertySvc.update({ id: id, ...body });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOneProperty(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOnePropertyResponse>> {
    return this.propertySvc.findOne({ id });
  }
}
