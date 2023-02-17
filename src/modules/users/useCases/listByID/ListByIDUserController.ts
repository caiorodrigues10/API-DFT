import { FastifyReply, FastifyRequest } from "fastify";
import { container, injectable } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const listCategory = container.resolve(ListCategoryUseCase);
    const response = await listCategory.execute();

    return reply.send(response);
  }
}

export { ListCategoryController };
