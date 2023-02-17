import { IUuidProvider } from "../IUuidProvider";
import { v4 as uuid, validate } from "uuid";

class UuidProvider implements IUuidProvider {
  create(): string {
    return uuid();
  }

  validate(value: string): boolean {
    return validate(value);
  }
}

export { UuidProvider };
