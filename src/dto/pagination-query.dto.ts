import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class QueryPaginationDto {
  @Type(() => Number)
  @IsInt()
  public readonly page: number;

  @Type(() => Number)
  @IsInt()
  public readonly limit: number;
}
