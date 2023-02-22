import { inject, injectable } from "tsyringe";
import { AppResponse } from "../../../../helper/AppResponse";
import { IUserRepository } from "../../../users/iRepository/IUserRepository";
import { IConfirmCodeRepository } from "../../iRepository/IConfirmCodeRepository";

@injectable()
class ValidConfirmCodUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("ConfirmCodeRepository")
    private confirmCodeRepository: IConfirmCodeRepository
  ) {}

  async execute(code: number, userId: string): Promise<AppResponse> {
    const user = await this.userRepository.updateCodeUser(userId);

    if (!user) {
      throw new AppResponse({
        message: "User not found",
        result: "error",
        status: 400,
      });
    }

    const codeUser = await this.confirmCodeRepository.listByUser(userId);

    if (!codeUser || codeUser.code !== code) {
      throw new AppResponse({
        message: "Code not valid",
        result: "error",
        status: 400,
      });
    }

    return new AppResponse({
      message: "Code is valid",
      result: "success",
      status: 200,
    });
  }
}

export { ValidConfirmCodUseCase };
