import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { CreateUser } from "../../dtos/user";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { confirmPassword, email, name, password } =
      request.body as CreateUser;
    const createUser = container.resolve(CreateUserUseCase);
    const response = await createUser.execute({
      confirmPassword,
      email,
      name,
      password,
    });

    return reply.send(response);
  }
}

export { CreateUserController };
