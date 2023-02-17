import { ConfirmCode, User } from "../dtos/user";

interface IUserRepository {
  create(data: Omit<User, "reg_active" | "code_active">): Promise<User>;
  list(): Promise<User[]>;
  listByID(value: string): Promise<User | null>;
  listByEmail(value: string): Promise<User | null>;
}

export { IUserRepository };
