import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, any> {
    return {
      env: process.env,
      ts: new Date().toISOString(),
    };
  }
}
