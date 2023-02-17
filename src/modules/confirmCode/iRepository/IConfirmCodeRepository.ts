import { ConfirmCode } from "../dtos/confirmCode";

interface IConfirmCodeRepository {
  create(value: ConfirmCode): Promise<ConfirmCode>;
  listByUser(id: string): Promise<ConfirmCode | null>;
  update(id: string, code: number): Promise<ConfirmCode>;
}

export { IConfirmCodeRepository };
