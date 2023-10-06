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
  CreateProductPropertyRequest,
  FindManyProductPropertiesResponse,
  FindOneProductPropertyResponse,
  PRODUCT_PROPERTY_SERVICE_NAME,
  ProductPropertyOperationResponse,
  ProductPropertyServiceClient,
  UpdateProductPropertyRequest,
} from 'src/pb/product-property.pb';

@Controller()
export class ProductPropertyController implements OnModuleInit {
  private productPropertySvc: ProductPropertyServiceClient;

  @Inject(PRODUCT_PROPERTY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.productPropertySvc =
      this.client.getService<ProductPropertyServiceClient>(
        PRODUCT_PROPERTY_SERVICE_NAME,
      );
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createProductProperty(
    @Body() body: CreateProductPropertyRequest,
  ): Promise<Observable<ProductPropertyOperationResponse>> {
    return this.productPropertySvc.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  private async updateProductProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductPropertyRequest,
  ): Promise<Observable<ProductPropertyOperationResponse>> {
    return this.productPropertySvc.update({ id: id, ...body });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOneProductProperty(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneProductPropertyResponse>> {
    return this.productPropertySvc.findOne({ id });
  }

  @Get()
  @UseGuards(AuthGuard)
  private async findManyProductProperties(): Promise<
    Observable<FindManyProductPropertiesResponse>
  > {
    return this.productPropertySvc.findAll({});
  }

  @Get('product/:productId')
  @UseGuards(AuthGuard)
  private async findProductPropertiesByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Observable<FindManyProductPropertiesResponse>> {
    return this.productPropertySvc.findProductPropertiesByProductId({
      productId,
    });
  }
}
