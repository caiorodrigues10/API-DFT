

import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { validCodeController } from "../modules/confirmCode/useCases/validate";

class CodeRoutes {
  public prefixRoute = "/validateCode";

  routes = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: HookHandlerDoneFunction
  ) => {
    fastify.post("/", validCodeController.handle);

    done();
  };
}

export { CodeRoutes };
