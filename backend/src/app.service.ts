import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      app: 'SEP Local API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
