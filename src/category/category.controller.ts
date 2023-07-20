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
  FindOneCategoryResponse,
  CategoryServiceClient,
  CATEGORY_SERVICE_NAME,
  CategoryOperationResponse,
  CreateCategoryRequest,
  FindAllCategoriesResponse,
  UpdateCategoryRequest,
} from './pb/category.pb';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('category')
export class CategoryController implements OnModuleInit {
  private svc: CategoryServiceClient;

  @Inject(CATEGORY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<CategoryServiceClient>(
      CATEGORY_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createCategory(
    @Body() body: CreateCategoryRequest,
  ): Promise<Observable<CategoryOperationResponse>> {
    return this.svc.createCategory(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  private async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryRequest,
  ): Promise<Observable<CategoryOperationResponse>> {
    return this.svc.updateCategory({ id: id, ...body });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneCategoryResponse>> {
    return this.svc.findOne({ id });
  }

  @Get()
  @UseGuards(AuthGuard)
  private async findAll(): Promise<Observable<FindAllCategoriesResponse>> {
    return this.svc.findAll({});
  }
}
