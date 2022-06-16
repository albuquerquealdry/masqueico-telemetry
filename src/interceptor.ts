
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const { init } = require('./otel/jeaguer.exporter')
const api = require('@opentelemetry/api')
init('teste')

import { tap } from 'rxjs/operators';
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