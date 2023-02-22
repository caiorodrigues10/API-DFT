import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { ValidConfirmCodUseCase } from "./ValidCodeUseCase";

class ValidCodeController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const {code, userId } =
      request.body as {code: number, userId: string};
    const validCode = container.resolve(ValidConfirmCodUseCase);

    const response = await validCode.execute(
      code,
      userId,
    );

    return reply.send(response);
  }
}

export { ValidCodeController };
