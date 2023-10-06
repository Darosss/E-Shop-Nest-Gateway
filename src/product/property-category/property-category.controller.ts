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
  CreatePropertyCategoryRequest,
  FindAllPropertyCategoriesResponse,
  FindOnePropertyCategoryResponse,
  PROPERTY_CATEGORIES_SERVICE_NAME,
  PropertyCategoriesServiceClient,
  PropertyCategoryOperationResponse,
  UpdatePropertyCategoryRequest,
} from 'src/pb/property-category.pb';

@Controller()
export class PropertyCategoryController implements OnModuleInit {
  private propertyCategoriesSvc: PropertyCategoriesServiceClient;

  @Inject(PROPERTY_CATEGORIES_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.propertyCategoriesSvc =
      this.client.getService<PropertyCategoriesServiceClient>(
        PROPERTY_CATEGORIES_SERVICE_NAME,
      );
  }

  @Get('all')
  @UseGuards(AuthGuard)
  private async findManyPropertyCategory(): Promise<
    Observable<FindAllPropertyCategoriesResponse>
  > {
    return this.propertyCategoriesSvc.findAll({});
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createPropertyCategory(
    @Body() body: CreatePropertyCategoryRequest,
  ): Promise<Observable<PropertyCategoryOperationResponse>> {
    return this.propertyCategoriesSvc.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  private async updatePropertyCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePropertyCategoryRequest,
  ): Promise<Observable<PropertyCategoryOperationResponse>> {
    return this.propertyCategoriesSvc.update({ id: id, ...body });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOnePropertyCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOnePropertyCategoryResponse>> {
    return this.propertyCategoriesSvc.findOne({ id });
  }
}
