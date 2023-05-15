import { Logger } from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = uuidv4();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const method = request.method;
    const url = request.url;
    const controllerName = context.getClass().name; // Get controller name
    const handlerName = context.getHandler().name; // Get handler (method) name
    const now = Date.now();

    this.logger.log(
      `Request: ID[ ${requestId} ] / ${method} ${url}`,
      `RequestData:ID[ ${requestId} ] / ${JSON.stringify({
        headers: request.headers,
        body: request.body,
        controller: controllerName,
        handler: handlerName,
      })}`,
    );

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(
          `Response: ID[ ${requestId} ] / ${method} ${url} ${response.statusCode} ${responseTime}ms`,
          `ResponseData: ID[ ${requestId} ] / ${JSON.stringify({
            headers: response.getHeaders(),
            body: response.body,
            controller: controllerName,
            handler: handlerName,
          })}`,
        );
      }),
    );
  }
}
