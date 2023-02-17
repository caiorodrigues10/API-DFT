import { prisma } from "../../../../libs/prismaClient";
import { User } from "../../dtos/user";
import { IUserRepository } from "../../iRepository/IUserRepository";

class UserRepository implements IUserRepository {
  async create(data: Omit<User, "reg_active" | "code_active">): Promise<User> {
    return prisma.tb_user.create({ data });
  }

  async list(): Promise<User[]> {
    return prisma.tb_user.findMany({
      where: {
        reg_active: true,
      },
    });
  }

  async listByID(value: string): Promise<User | null> {
    return prisma.tb_user.findUnique({
      where: {
        id: value,
      },
    });
  }

  async listByEmail(value: string): Promise<User | null> {
    return prisma.tb_user.findFirst({
      where: {
        email: value,
      },
    });
  }
}

export { UserRepository };
