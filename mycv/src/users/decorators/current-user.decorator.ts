import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // context:
  // Unlike "request" object that only handles http requests,
  // It also handles http, websocket, gRPC, GraphQL
  (_data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
