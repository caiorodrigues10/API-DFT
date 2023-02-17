import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { createUserController } from "../modules/users/useCases/create";

class UserRoutes {
  public prefixRoute = "/user";

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: HookHandlerDoneFunction
  ) => {
    fastify.post("/", createUserController.handle);

    done();
  };
}

export { UserRoutes };
