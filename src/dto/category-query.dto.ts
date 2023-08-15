import { IsIn, IsOptional } from 'class-validator';
import { QueryPaginationDto } from './pagination-query.dto';
import { Type } from 'class-transformer';

export class QueryCategoriesDto extends QueryPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsIn([0, 1]) // 0 for descending, 1 for ascending
  public readonly sortOrder?: number;

  @IsOptional()
  @IsIn(['name', 'sold', 'price'])
  public readonly sortBy?: string;
}
