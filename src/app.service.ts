import { Injectable } from '@nestjs/common';
const { init } = require('./otel/jeaguer.exporter')
const api = require('@opentelemetry/api')
init('app teste') // calling tracer with service name and environment to view in jaegerui
@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
