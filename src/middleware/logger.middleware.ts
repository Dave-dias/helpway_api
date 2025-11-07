import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = req;
    const start = Date.now();

    return next.handle().pipe(
      map((data) => {
        const duration = Date.now() - start;
        const responsePreview =
          typeof data === 'object' ? JSON.stringify(data).slice(0, 300) : data;

        this.logger.log(
          `${method} ${url} - ${duration}ms\n` +
            `Params: ${JSON.stringify(params)}\n` +
            `Query: ${JSON.stringify(query)}\n` +
            `Body: ${JSON.stringify(body)}\n` +
            `Response: ${responsePreview}`,
        );

        return data; // must return the original response
      }),
    );
  }
}
