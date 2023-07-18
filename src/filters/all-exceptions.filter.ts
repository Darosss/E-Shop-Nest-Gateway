import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { handle_gRpcStatusCodes } from './rpc-statuscodes.helper';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception.code
      ? handle_gRpcStatusCodes(exception.code)
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage: string =
      exception.details ?? exception.message ?? 'Unknown error';

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: errorMessage,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    return super.catch(exception, host);
  }
}
