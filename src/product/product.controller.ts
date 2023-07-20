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
import {
  FindOneProductResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  ProductOperationResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from '../pb/product.pb';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('product')
export class ProductController implements OnModuleInit {
  private svc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<Observable<ProductOperationResponse>> {
    return this.svc.createProduct(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  private async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductRequest,
  ): Promise<Observable<ProductOperationResponse>> {
    return this.svc.updateProduct({ id: id, ...body });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneProductResponse>> {
    return this.svc.findOne({ id });
  }
}
