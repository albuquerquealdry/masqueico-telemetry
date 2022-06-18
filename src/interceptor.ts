
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const { jeagerExporter } = require('./otel/jeaguer.exporter')
const { zipkinExporter } = require("./otel/zipkin.exporter")
const { pro } = require("./otel/prometheus.exporter")
const api = require('@opentelemetry/api')

zipkinExporter()
jeagerExporter('teste')
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