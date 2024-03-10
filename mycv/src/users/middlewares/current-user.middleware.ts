import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

// interface RequestWithSession extends Request {
//   session: any;
//   currentUser: User;
// }

declare global {
  namespace Express {
    interface Request {
      session?: any;
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.find(userId);

      req.currentUser = user;
    }

    next();
  }
}
