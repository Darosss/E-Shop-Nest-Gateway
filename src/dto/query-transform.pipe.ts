import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QueryTransformPipe<T = unknown> implements PipeTransform {
  async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    return plainToInstance(metatype, value);
  }
}
