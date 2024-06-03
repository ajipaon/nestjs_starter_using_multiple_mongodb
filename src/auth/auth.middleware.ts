import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMidlleware implements NestMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
  }
}
