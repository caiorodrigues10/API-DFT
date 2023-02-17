import { container } from "tsyringe";
import { IEmailProvider } from "./emailProvider/IEmailProvider";
import { NodemailerProvider } from "./emailProvider/implementation/NodemailerProvider";
import { UuidProvider } from "./uuidProvider/implementation/uuidProvider";
import { IUuidProvider } from "./uuidProvider/IUuidProvider";

container.registerSingleton<IUuidProvider>("UuidProvider", UuidProvider);
container.registerSingleton<IEmailProvider>(
  "IEmailProvider",
  NodemailerProvider
);
