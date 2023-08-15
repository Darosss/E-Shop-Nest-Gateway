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
  Query,
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
} from '../pb/category.pb';
import { AuthGuard } from '../auth/guard/auth.guard';
import { QueryTransformPipe } from 'src/dto/query-transform.pipe';
import { QueryCategoriesDto } from 'src/dto/category-query.dto';
import { ProductQueries } from 'src/pb/product.pb';

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
  private async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindOneCategoryResponse>> {
    return this.svc.findOne({ id });
  }

  @Get('slug/:headSlug/:subHeadSlug?/:categorySlug?')
  private async findOneBySlugs(
    @Param('headSlug') headSlug: string,
    @Param('subHeadSlug') subHeadSlug?: string,
    @Param('categorySlug') categorySlug?: string,
    @Query(new QueryTransformPipe<QueryCategoriesDto>())
    query?: QueryCategoriesDto,
  ): Promise<Observable<FindOneCategoryResponse>> {
    const { sortBy, sortOrder, limit, page } = query;
    const productQueries: ProductQueries = {
      sort: { sortBy, sortOrder },
      pagination: { limit, page },
    };
    if (categorySlug && subHeadSlug) {
      return this.svc.findOneByCategorySlug({
        headSlug,
        subHeadSlug,
        categorySlug,
        productQueries,
      });
    } else if (subHeadSlug) {
      return this.svc.findOneBySubHeadSlug({
        headSlug,
        subHeadSlug,
        productQueries,
      });
    } else {
      return this.svc.findOneByHeadSlug({
        headSlug,
        productQueries,
      });
    }
  }

  @Get()
  private async findAll(): Promise<Observable<FindAllCategoriesResponse>> {
    return this.svc.findAll({});
  }
}
