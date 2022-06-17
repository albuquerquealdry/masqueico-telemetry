
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const { init } = require('./otel/jeaguer.exporter')
const { init2 } = require("./otel/zipkin.exporter")
const api = require('@opentelemetry/api')
init('teste')

init2()
export interface Response<T> {
  data: T;
}


@Injectable()
export class Telemetry implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`⌛ RESPONSE TIME ⌛ || ${Date.now() - now}ms || MASQUEICO 🐵 TELEMETRY`)),
      );
  }
}