import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../iRepository/IUserRepository";
import { AppResponse } from "../../../../helper/AppResponse";
import { IUuidProvider } from "../../../../shared/container/providers/uuidProvider/IUuidProvider";
import { CreateUser } from "../../dtos/user";
import { IEmailProvider } from "../../../../shared/container/providers/emailProvider/IEmailProvider";
import { IConfirmCodeRepository } from "../../../confirmCode/iRepository/IConfirmCodeRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider,
    @inject("IEmailProvider")
    private emailProvider: IEmailProvider,
    @inject("ConfirmCodeRepository")
    private confirmCodeRepository: IConfirmCodeRepository
  ) {}

  async execute({
    confirmPassword,
    email,
    name,
    password,
  }: CreateUser): Promise<AppResponse> {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    const code = getRandomInt(100000, 999999);

    console.log(code);

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validEmail)) {
      throw new AppResponse({
        message: "Invalid email",
        result: "error",
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      throw new AppResponse({
        message: "Confirm password is different of password",
        result: "error",
        status: 400,
      });
    }

    const userExist = await this.userRepository.listByEmail(email);

    if (userExist) {
      if (userExist.code_active) {
        throw new AppResponse({
          message: "User already exists",
          result: "error",
          status: 409,
        });
      } else {
        const codeExist = await this.confirmCodeRepository.listByUser(
          userExist.id
        );
        if (codeExist) {
          await this.confirmCodeRepository.update(codeExist.id, code);

          await this.emailProvider.sendConfirmAccount(
            email,
            code,
            "Verify code."
          );

          throw new AppResponse({
            message: "New code generate",
            result: "success",
            status: 201,
          });
        } else {
          await this.confirmCodeRepository.create({
            id: this.uuidProvider.create(),
            user_id: userExist.id,
            code,
          });

          await this.emailProvider.sendConfirmAccount(
            email,
            code,
            "Verify code."
          );

          throw new AppResponse({
            message: "New code generate",
            result: "success",
            status: 201,
          });
        }
      }
    }

    const response = await this.userRepository.create({
      id: this.uuidProvider.create(),
      email,
      name,
      password,
    });

    await this.confirmCodeRepository.create({
      id: this.uuidProvider.create(),
      user_id: response.id,
      code,
    });

    await this.emailProvider.sendConfirmAccount(email, code, "Verify code.");

    return new AppResponse({
      data: response,
      message: "Confirm code",
      result: "success",
      status: 201,
    });
  }
}

export { CreateUserUseCase };
