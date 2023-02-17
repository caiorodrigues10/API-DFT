import { prisma } from "../../../../libs/prismaClient";
import { ConfirmCode } from "../../dtos/confirmCode";
import { IConfirmCodeRepository } from "../../iRepository/IConfirmCodeRepository";

class ConfirmCodeRepository implements IConfirmCodeRepository {
  async update(id: string, code: number): Promise<ConfirmCode> {
    return prisma.tb_code_account.update({
      where: {
        id,
      },
      data: {
        code,
      },
    });
  }

  async create(data: ConfirmCode): Promise<ConfirmCode> {
    return prisma.tb_code_account.create({ data });
  }

  async listByUser(user_id: string): Promise<ConfirmCode | null> {
    return prisma.tb_code_account.findFirst({
      where: {
        user_id,
      },
    });
  }
}

export { ConfirmCodeRepository };
