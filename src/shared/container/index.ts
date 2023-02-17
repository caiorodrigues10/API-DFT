import { container } from "tsyringe";
import { IConfirmCodeRepository } from "../../modules/confirmCode/iRepository/IConfirmCodeRepository";
import { ConfirmCodeRepository } from "../../modules/confirmCode/repository/prisma/ConfirmCodeRepository";
import { IUserRepository } from "../../modules/users/iRepository/IUserRepository";
import { UserRepository } from "../../modules/users/repository/prisma/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IConfirmCodeRepository>(
  "ConfirmCodeRepository",
  ConfirmCodeRepository
);
