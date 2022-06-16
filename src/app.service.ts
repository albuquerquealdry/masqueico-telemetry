import { Injectable } from '@nestjs/common';
 // calling tracer with service name and environment to view in jaegerui
@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
